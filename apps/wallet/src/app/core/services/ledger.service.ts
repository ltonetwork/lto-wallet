import { Platform } from '@angular/cdk/platform';
import { Injectable, ClassProvider, Inject } from '@angular/core';

import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';
import { BehaviorSubject } from 'rxjs';

import { LTO_NETWORK_BYTE } from '../../tokens';

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
  
  public async connect(addressId: number): Promise<void> {
    this.ledger = new WavesLedger(this.ledgerOptions);

    // @todo: store the user info in a session?
    const userInfo = await this.ledger.getUserDataById(addressId, false);
    this.connected$.next(!!this.ledger.ready);
    console.log(userInfo);
  }

  public async disconnect(): Promise<void> {
    await this.ledger.disconnect();
    this.connected$.next(!!this.ledger.ready);
  }
}

export abstract class LedgerService {
  public static provider: ClassProvider = {
    provide: LedgerService,
    useClass: LedgerServiceImpl,
  };

  public abstract connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public abstract connect(addressId: number): Promise<void>
  public abstract disconnect(): Promise<void>
}
