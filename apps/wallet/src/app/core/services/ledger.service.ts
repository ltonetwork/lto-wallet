import { Platform } from '@angular/cdk/platform';
import { Injectable, ClassProvider, Inject } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { LTO_NETWORK_BYTE } from '@wallet/tokens';

enum NetworkCode {
  MAINNET = 76,
  TESTNET = 84
}

export interface LedgerOptions {
  debug: boolean | undefined;
  openTimeout: number;
  listenTimeout: number;
  exchangeTimeout: number;
  networkCode: NetworkCode; 
  transport: typeof TransportU2F | TransportWebUSB
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
export class LedgerServiceImpl implements LedgerService {
  private ledger!: WavesLedger;
  private networkCode: NetworkCode;
  private ledgerOptions: LedgerOptions;
  private transport: typeof TransportU2F | TransportWebUSB;

  public connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    private platform: Platform,
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
    await this.ledger.getUserDataById(0, false);
    this.connected$.next(true);
  }

  public async disconnect(): Promise<void> {
    await this.ledger.disconnect();
    this.connected$.next(false);
  }

  public async getUserDataById(addressId: number = 0): Promise<ILedgerAccount> {
    const ledgerData = await this.ledger.getUserDataById(addressId, false);
    return {
      id: ledgerData.id,
      name: 'Ledger Wallet',
      address: ledgerData.address,
      publicKey: ledgerData.publicKey,
    };
  }
}

export abstract class LedgerService {
  public static provider: ClassProvider = {
    provide: LedgerService,
    useClass: LedgerServiceImpl,
  };

  public abstract connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public abstract connect(): Promise<void>
  public abstract disconnect(): Promise<void>
  public abstract getUserDataById(addressId: number): Promise<ILedgerAccount>
}
