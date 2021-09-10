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
  TTx,
  WithId,
} from '@lto-network/lto-transactions';
import { TRANSACTION_TYPE } from '@lto-network/lto-transactions/dist/transactions';

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

    let schema, version, rawTransaction;
    let unsignedTransaction: ITransaction & WithId;
    const senderPublicKey = this.userData.publicKey;

    switch (data.type) {
      case TransactionTypes.TRANSFER:
        if (!data.recipient) throw new Error('Property "recipient" is undefined');
        if (!data.amount) throw new Error('Property "amount" is undefined');
        if (!data.attachment) data.attachment = '';

        // @todo: for now, ledger signing only works with transfer v1, need to add more recent versions to it (v2, v3)
        // https://github.com/iicc1/ledger-app-lto/issues/3
        version = 1;

        rawTransaction = {
          version,
          fee: data.fee,
          senderPublicKey,
          amount: data.amount,
          recipient: data.recipient,
          timestamp: data.timestamp,
          attachment: data.attachment,
          type: data.type as unknown as TRANSACTION_TYPE.TRANSFER,
        };

        unsignedTransaction = transfer(rawTransaction);

        // @todo: update schema once lto-transactions PR is merged
        schema = parseSerialize.schemas.transferSchemaV1;
        // schema = parseSerialize.schemas.transferSchemaLedger;
        break;
      case TransactionTypes.MASS_TRANSFER:
        // @todo: signs but errors on broadcast (incorrect proof) - possibly mismatched params?
        if (!data.transfers) throw new Error('Transfers property is undefined');
        if (!data.attachment) data.attachment = '';

        version = 1;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          transfers: data.transfers,
          timestamp: data.timestamp,
          attachment: data.attachment,
          type: data.type as unknown as TRANSACTION_TYPE.MASS_TRANSFER,
        };

        unsignedTransaction = massTransfer(rawTransaction);

        schema = parseSerialize.schemas.massTransferSchemaV1;
        break;
      case TransactionTypes.LEASING:
        if (!data.recipient) throw new Error('Property "recipient" is undefined');
        if (!data.amount) throw new Error('Property "amount" is undefined');

        // @todo: for now, ledger signing only works with leasing v1, need to add more recent versions to it (v2, v3)
        // https://github.com/iicc1/ledger-app-lto/issues/3
        version = 1;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          amount: data.amount,
          recipient: data.recipient,
          timestamp: data.timestamp,
          type: data.type as unknown as TRANSACTION_TYPE.LEASE,
        };

        unsignedTransaction = lease(rawTransaction);

        // @todo: update schema once lto-transactions PR is merged
        schema = parseSerialize.schemas.leaseSchemaV2;
        // schema = parseSerialize.schemas.leaseSchemaLedger;
        break;
      case TransactionTypes.CANCEL_LEASING:
        // @todo: signs but errors on broadcast (incorrect proof) - possibly mismatched params?
        if (!data.transactionId) throw new Error('Property "transactionId" is undefined');

        version = 2;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          chainId: this.networkCode,
          timestamp: data.timestamp,
          leaseId: data.transactionId,
          type: data.type as unknown as TRANSACTION_TYPE.CANCEL_LEASE,
        };

        unsignedTransaction = cancelLease(rawTransaction);

        schema = parseSerialize.schemas.cancelLeaseSchemaV2;
        break;
      case TransactionTypes.ANCHOR:
        // @todo: signs but errors on broadcast (incorrect proof) - possibly mismatched params?
        if (!data.anchors) throw new Error('Property "anchors" is undefined');

        // fixing old anchor type (old = 12; new = 15)
        data.type = TransactionTypes.ANCHOR_NEW;

        version = 1;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          anchors: data.anchors,
          timestamp: data.timestamp,
          type: data.type as unknown as TRANSACTION_TYPE.ANCHOR,
        };

        unsignedTransaction = anchor(rawTransaction);

        schema = parseSerialize.schemas.anchorSchemaV1;
        break;
      default:
        throw new Error('Unknown transaction type');
    }

    const serializer = parseSerialize.binary.serializerFromSchema(schema);
    const byteTransaction = serializer(unsignedTransaction);
    const signature = await this.ledger.signTransaction(this.userId, { precision: 1 }, byteTransaction);

    const signedTransaction = {
      ...rawTransaction,
      version,
      proofs: [signature],
    };

    // @todo: remove debugging console.logs
    console.log('Byte Transaction: ', byteTransaction);
    console.log('Signed Transaction: ', signedTransaction);
    console.log('Unsigned Transaction: ', unsignedTransaction);

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
