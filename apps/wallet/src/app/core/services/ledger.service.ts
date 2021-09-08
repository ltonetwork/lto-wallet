import { Platform } from '@angular/cdk/platform';
import { Injectable, ClassProvider, Inject } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { TransactionTypes } from '@wallet/core/transaction-types';
import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@wallet/tokens';

import {
  anchor,
  lease,
  transfer,
  broadcast,
  cancelLease,
  massTransfer,
  parseSerialize,
  ITransaction,
  ILeaseTransaction,
  IAnchorTransaction,
  ICancelLeaseTransaction,
  IMassTransferTransaction,
  ITransferTransaction,
  TTx,
  WithId,
} from '@lto-network/lto-transactions';

enum NetworkCode {
  MAINNET = 76,
  TESTNET = 84,
}

export interface LedgerOptions {
  debug?: boolean;
  openTimeout: number;
  listenTimeout: number;
  exchangeTimeout: number;
  networkCode: NetworkCode;
  transport: typeof TransportU2F | TransportWebUSB;
}

export interface ILedgerAccount {
  id: number;
  name: string;
  address: string;
  publicKey: string;
}

export interface IUnsignedTransaction {
  fee: number;
  type: number;
  amount?: number;
  recipient?: string;
  timestamp: number;
  attachment?: string;
  transactionId?: string;
  anchors?: string[];
  transfers?: { recipient: string, amount: number }[]
}

@Injectable({
  providedIn: 'root',
})
export class LedgerServiceImpl implements LedgerService {
  private ledger?: WavesLedger;
  private networkCode: NetworkCode;
  private ledgerOptions: LedgerOptions;
  private transport: typeof TransportU2F | TransportWebUSB;

  public userId: number = 0;
  public userData?: ILedgerAccount;
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private platform: Platform,
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    @Inject(LTO_PUBLIC_API) private nodeUrl: string,
  ) {
    this.transport = TransportWebUSB;
    this.networkCode = networkByte.charCodeAt(0);

    // Firefox and Safari do not support WebUSB, use legacy U2F instead
    if (this.platform.SAFARI || this.platform.FIREFOX) {
      this.transport = TransportU2F;
    }

    this.ledgerOptions = {
      debug: false,
      openTimeout: 3000,
      listenTimeout: 250000,
      exchangeTimeout: 250000,
      networkCode: this.networkCode,
      transport: this.transport,
    };
  }

  public async connect(): Promise<void> {
    this.ledger = new WavesLedger(this.ledgerOptions);

    // wait until device is connected
    const ledgerData = await this.ledger.getUserDataById(this.userId, false);
    this.userData = {
      ...ledgerData,
      name: `Ledger Wallet ${this.userId}`,
    };

    this.connected$.next(true);
  }

  public async disconnect(): Promise<void> {
    if (!this.ledger) throw new Error('Ledger not connected');

    await this.ledger.disconnect();
    this.connected$.next(false);
  }

  public async signAndBroadcast(data: IUnsignedTransaction): Promise<void> {
    if (!this.ledger) throw new Error('Ledger not connected');
    if (!this.userData) throw new Error('Error with Ledger address data');

    let schema, version;
    let unsignedTransaction: ITransaction & WithId;
    const senderPublicKey = this.userData.publicKey;

    // @todo: Test all transaction types
    switch (data.type) {
      case TransactionTypes.TRANSFER:
        if (!data.recipient) throw new Error('Property "recipient" is undefined');
        if (!data.amount) throw new Error('Property "amount" is undefined');
        if (!data.attachment) data.attachment = '';

        // @todo: for now, ledger signing only works with transfer v1, need to add more recent versions to it (v2, v3)
        // https://github.com/iicc1/ledger-app-lto/issues/3
        version = 1;
        unsignedTransaction = transfer({
          ...data,
          version,
          senderPublicKey,
        } as ITransferTransaction);

        if (version === 1) schema = parseSerialize.schemas.transferSchemaV1;
        else schema = parseSerialize.schemas.transferSchemaV2;
        break;
      case TransactionTypes.MASS_TRANSFER:
        if (!data.transfers) throw new Error('Transfers property is undefined');

        version = 1;
        unsignedTransaction = massTransfer({
          ...data,
          version,
          senderPublicKey,
        } as IMassTransferTransaction);

        schema = parseSerialize.schemas.massTransferSchemaV1;
        break;
      case TransactionTypes.LEASING:
        if (!data.recipient) throw new Error('Property "recipient" is undefined');
        if (!data.amount) throw new Error('Property "amount" is undefined');

        version = 2;
        unsignedTransaction = lease({
          ...data,
          version,
          senderPublicKey,
        } as ILeaseTransaction);

        schema = parseSerialize.schemas.leaseSchemaV2;
        break;
      case TransactionTypes.CANCEL_LEASING:
        if (!data.transactionId) throw new Error('Property "transactionId" is undefined');

        version = 2;
        unsignedTransaction = cancelLease({
          ...data,
          version,
          senderPublicKey
        } as ICancelLeaseTransaction);

        schema = parseSerialize.schemas.cancelLeaseSchemaV2;
      case TransactionTypes.ANCHOR:
        if (!data.anchors) throw new Error('Property "anchors" is undefined');

        version = 1;
        unsignedTransaction = anchor({
          ...data,
          version,
          senderPublicKey
        } as IAnchorTransaction);

        schema = parseSerialize.schemas.anchorSchemaV1;
        break;
      default:
        throw new Error('Unknown transaction type');
    }

    const serializer = parseSerialize.binary.serializerFromSchema(schema);
    const byteTransaction = serializer(unsignedTransaction);
    const signature = await this.ledger.signTransaction(this.userId, { precision: 1 }, byteTransaction);

    const signedTransaction = {
      ...data,
      version,
      senderPublicKey,
      proofs: [signature],
    };

    await broadcast(signedTransaction as TTx<string | number>, this.nodeUrl);
  }
}

export abstract class LedgerService {
  public static provider: ClassProvider = {
    provide: LedgerService,
    useClass: LedgerServiceImpl,
  };

  public userId: number = 0;
  public userData?: ILedgerAccount;
  public abstract connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public abstract connect(): Promise<void>;
  public abstract disconnect(): Promise<void>;
  public abstract signAndBroadcast(data: IUnsignedTransaction): Promise<void>;
}
