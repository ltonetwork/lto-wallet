import { Platform } from '@angular/cdk/platform';
import { Injectable, ClassProvider, Inject } from '@angular/core';

import { BehaviorSubject, Subscription } from 'rxjs';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { TransactionTypes } from '@app/core/transaction-types';
import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@app/tokens';

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
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from '@app/components/content-dialog';
import { toPromise } from '../utils';

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
  attachment?: string;
  transactionId?: string;
  anchors?: string[];
  transfers?: { recipient: string; amount: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class LedgerServiceImpl implements LedgerService {
  private ledger?: WavesLedger;
  private networkCode: NetworkCode;
  private ledgerOptions: LedgerOptions;
  private transport: typeof TransportU2F | TransportWebUSB;

  public ledgerId: number = 0;
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public ledgerAccount$: BehaviorSubject<ILedgerAccount | null> =
    new BehaviorSubject<ILedgerAccount | null>(null);

  constructor(
    private platform: Platform,
    private matDialog: MatDialog,
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    @Inject(LTO_PUBLIC_API) private nodeUrl: string
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

    await this.updateUserData();

    this.connected$.next(true);
  }

  public async disconnect(): Promise<void> {
    if (!this.ledger) throw new Error('Ledger not connected');

    await this.ledger.disconnect();
    this.connected$.next(false);
    this.ledgerAccount$.next(null);
  }

  public async updateUserData(): Promise<void> {
    if (!this.ledger) throw new Error('Ledger not connected');

    // wait until device is connected
    const ledgerData = await this.ledger.getUserDataById(this.ledgerId, false);
    this.ledgerAccount$.next({
      ...ledgerData,
      name: `Ledger Wallet ${this.ledgerId}`,
    });
  }

  public async signAndBroadcast(data: IUnsignedTransaction): Promise<void> {
    if (!this.ledger) throw new Error('Ledger not connected');

    const ledgerAccount = await toPromise(this.ledgerAccount$);
    if (!ledgerAccount) throw new Error('Error with Ledger address data');

    let schema, version, rawTransaction, prefixBytes;
    let unsignedTransaction: ITransaction & WithId;
    const senderPublicKey = ledgerAccount.publicKey;

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
          attachment: data.attachment,
          type: data.type as unknown as TRANSACTION_TYPE.TRANSFER,
        };

        unsignedTransaction = transfer(rawTransaction);

        prefixBytes = new Uint8Array();
        schema = parseSerialize.schemas.transferSchemaV1;
        break;
      case TransactionTypes.MASS_TRANSFER:
        // @todo: mass transfer is not supported on Ledger app yet
        if (!data.transfers) throw new Error('Transfers property is undefined');
        if (!data.attachment) data.attachment = '';

        version = 1;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          transfers: data.transfers,
          attachment: data.attachment,
          type: data.type as unknown as TRANSACTION_TYPE.MASS_TRANSFER,
        };

        unsignedTransaction = massTransfer(rawTransaction);

        prefixBytes = new Uint8Array();
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
          type: data.type as unknown as TRANSACTION_TYPE.LEASE,
        };

        unsignedTransaction = lease(rawTransaction);

        prefixBytes = new Uint8Array();
        schema = parseSerialize.schemas.leaseSchemaV1;
        break;
      case TransactionTypes.CANCEL_LEASING:
        if (!data.transactionId) throw new Error('Property "transactionId" is undefined');

        // @todo: for now, ledger signing only works with cancel leasing v1, need to add more recent versions to it (v2, v3)
        // https://github.com/iicc1/ledger-app-lto/issues/3
        version = 1;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          chainId: this.networkCode,
          leaseId: data.transactionId,
          type: data.type as unknown as TRANSACTION_TYPE.CANCEL_LEASE,
        };

        unsignedTransaction = cancelLease(rawTransaction);

        prefixBytes = new Uint8Array();
        schema = parseSerialize.schemas.cancelLeaseSchemaV1;
        break;
      case TransactionTypes.ANCHOR:
        if (!data.anchors) throw new Error('Property "anchors" is undefined');

        // fixing old anchor type (old = 12; new = 15)
        data.type = TransactionTypes.ANCHOR_NEW;

        version = 1;

        rawTransaction = {
          version,
          senderPublicKey,
          fee: data.fee,
          anchors: data.anchors,
          type: data.type as unknown as TRANSACTION_TYPE.ANCHOR,
        };

        unsignedTransaction = anchor(rawTransaction);

        // on Ledger, anchor tx bytes start with
        // `type + version + type + version`
        // see https://github.com/Stakely/lto-network-ledger-wallet-ui/blob/master/scripts/transactions.js#L94
        prefixBytes = new Uint8Array([15, 1]);
        schema = parseSerialize.schemas.anchorSchemaV1;
        break;
      default:
        throw new Error('Unknown transaction type');
    }

    const contentDialog = this.matDialog.open(ContentDialogComponent, {
      disableClose: true,
      data: {
        title: 'Awaiting input from device',
        content: 'Please review the transaction on your Ledger device',
      },
    });

    const serializer = parseSerialize.binary.serializerFromSchema(schema);
    const byteTransaction = serializer(unsignedTransaction);

    // `prefixBytes` is used to assemble the data properly before sending to Ledger app
    // Ledger app doesn't sign properly if data is not correct,
    // and it's slightly different from proper schema sometimes
    const finalBytes = new Uint8Array(prefixBytes.length + byteTransaction.length);
    finalBytes.set(prefixBytes);
    finalBytes.set(byteTransaction, prefixBytes.length);

    const signature = await this.ledger.signTransaction(
      this.ledgerId,
      { precision: 1 },
      finalBytes
    );

    contentDialog.close();

    const signedTransaction = {
      ...unsignedTransaction,
      signature,
    };

    // workaround for nodes running v1.3 - signature is used instead of proofs
    // @ts-ignore
    delete signedTransaction.proofs;

    await broadcast(signedTransaction as unknown as TTx<string | number>, this.nodeUrl);
  }
}

export abstract class LedgerService {
  public static provider: ClassProvider = {
    provide: LedgerService,
    useClass: LedgerServiceImpl,
  };

  public ledgerId: number = 0;

  public abstract connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public abstract ledgerAccount$: BehaviorSubject<ILedgerAccount | null> =
    new BehaviorSubject<ILedgerAccount | null>(null);

  public abstract connect(): Promise<void>;
  public abstract disconnect(): Promise<void>;
  public abstract updateUserData(): Promise<void>;
  public abstract signAndBroadcast(data: IUnsignedTransaction): Promise<void>;
}
