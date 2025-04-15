import { Injectable, ClassProvider, Inject } from '@angular/core';

import { BehaviorSubject, Subject } from 'rxjs';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { LTO_NETWORK_BYTE } from '@app/tokens';

import { toPromise } from '../utils';
import LTO from '@ltonetwork/lto';
import { Anchor, Transaction } from '@ltonetwork/lto/transactions';

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
  public dialog$ = new Subject<'open' | 'close'>();

  constructor(
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
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

  public async signAndBroadcast(tx: Transaction): Promise<void> {
    if (!this.ledger) {
      throw new Error('Ledger not connected');
    }

    const ledgerAccount = await toPromise(this.ledgerAccount$);
    if (!ledgerAccount) {
      throw new Error('Error with Ledger address data');
    }

    let prefixBytes = new Uint8Array();
    const sender = this.lto.account({ publicKey: ledgerAccount.publicKey });

    tx.version = 1;
    tx.sender = sender.address;
    tx.senderKeyType = 'ed25519';
    tx.senderPublicKey = sender.publicKey;

    if (tx.type === Anchor.TYPE) {
      // on Ledger, anchor tx bytes start with
      // `type + version + type + version`
      // see https://github.com/Stakely/lto-network-ledger-wallet-ui/blob/master/scripts/transactions.js#L94
      prefixBytes = new Uint8Array([15, 1]);
    }

    /*const contentDialog = this.matDialog.open(ContentDialogComponent, {
      disableClose: true,
      data: {
        title: 'Awaiting input from device',
        content: 'Please review the transaction on your Ledger device',
      },
    });*/
    this.dialog$.next('open');

    const byteTransaction = tx.toBinary();

    // `prefixBytes` is used to assemble the data properly before sending to Ledger app
    // Ledger app doesn't sign properly if data is not correct,
    // and it's slightly different from proper schema sometimes
    const finalBytes = new Uint8Array(prefixBytes.length + byteTransaction.length);
    finalBytes.set(prefixBytes);
    finalBytes.set(byteTransaction, prefixBytes.length);

    const signature = await this.ledger
      .signTransaction(this.ledgerId, { precision: 1 }, finalBytes)
      .catch((error) => {
        this.dialog$.next('close');
        return Promise.reject(error);
      });

    tx.proofs.push(signature);

    this.dialog$.next('close');

    await this.lto.node.broadcast(tx);
  }
}
