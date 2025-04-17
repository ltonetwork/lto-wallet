import { Injectable, ClassProvider, Inject } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { LTO_NETWORK_BYTE } from '@app/tokens';

import { toPromise } from '../utils';
import LTO from '@ltonetwork/lto';
import { Anchor, CancelLease, Lease, Transaction, Transfer } from '@ltonetwork/lto/transactions';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from '@app/components';

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
  transport: typeof TransportWebUSB;
}

export interface ILedgerAccount {
  id: number;
  name: string;
  address: string;
  publicKey: string;
}

@Injectable({
  providedIn: 'root',
})
export class LedgerService {
  private ledger?: WavesLedger;
  private networkCode: NetworkCode;
  private ledgerOptions: LedgerOptions;
  private transport: typeof TransportWebUSB;
  private lto: LTO;

  public ledgerId = 0;
  public connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public ledgerAccount$: BehaviorSubject<ILedgerAccount | null> =
    new BehaviorSubject<ILedgerAccount | null>(null);

  constructor(
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    private matDialog: MatDialog,
  ) {
    this.transport = TransportWebUSB;
    this.networkCode = networkByte.charCodeAt(0);
    this.lto = new LTO(networkByte);

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
    if (!this.ledger) {
      return;
    }

    await this.ledger.disconnect();
    this.connected$.next(false);
    this.ledgerAccount$.next(null);
  }

  public async updateUserData(): Promise<void> {
    if (!this.ledger) {
      throw new Error('Ledger not connected');
    }

    // wait until device is connected
    const ledgerData = await this.ledger.getUserDataById(this.ledgerId, false);
    this.ledgerAccount$.next({
      ...ledgerData,
      name: `Ledger Wallet ${this.ledgerId}`,
    });
  }

  public async sign<T extends Transaction>(tx: T): Promise<T> {
    if (!this.ledger) {
      throw new Error('Ledger not connected');
    }

    const ledgerAccount = await toPromise(this.ledgerAccount$);
    if (!ledgerAccount) {
      throw new Error('Error with Ledger address data');
    }

    let shiftBytes = 0;
    const sender = this.lto.account({ publicKey: ledgerAccount.publicKey });

    tx.version = 1;
    tx.sender = sender.address;
    tx.senderKeyType = 'ed25519';
    tx.senderPublicKey = sender.publicKey;
    tx.timestamp ??= Date.now();

    switch (tx.type) {
      case Transfer.TYPE:
        tx.version = 2;
        shiftBytes = 2;
        break;
      case Lease.TYPE:
      case CancelLease.TYPE:
        tx.version = 2;
        shiftBytes = 3;
        break;
      case Anchor.TYPE:
        tx.version = 1;
        shiftBytes = 1;
        break;
      default:
        throw new Error('Transaction type not supported by Ledger');
    }

    const contentDialog = this.matDialog.open(ContentDialogComponent, {
      disableClose: true,
      data: {
        title: 'Awaiting input from device',
        content: 'Please review the transaction on your Ledger device',
      },
    });

    const byteTransaction = tx.toBinary();

    // on Ledger, tx bytes start with
    // `type + version + type`
    // Version is always 1 for Ledger
    // see https://github.com/Stakely/lto-network-ledger-wallet-ui/blob/master/scripts/transactions.js#L94
    const prefixBytes = Uint8Array.from([tx.type, 1, tx.type]);
    const finalBytes = new Uint8Array(prefixBytes.length + byteTransaction.length - shiftBytes);
    finalBytes.set(prefixBytes);
    finalBytes.set(byteTransaction.slice(shiftBytes), prefixBytes.length);

    const signature = await this.ledger
      .signTransaction(this.ledgerId, { precision: 1 }, finalBytes)
      .catch((error) => {
        contentDialog.close();
        return Promise.reject(error);
      });

    tx.version = 1;
    tx.proofs.push(signature);

    contentDialog.close();

    return tx;
  }
}
