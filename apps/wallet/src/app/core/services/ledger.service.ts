import { Platform } from '@angular/cdk/platform';
import { Injectable, ClassProvider, Inject } from '@angular/core';

import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

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
  ledger!: WavesLedger;
  ledgerOptions: LedgerOptions;

  networkCode: NetworkCode;
  transport: typeof TransportU2F | TransportWebUSB;

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
  
  async connect(addressId: number): Promise<void> {
    this.ledger = new WavesLedger(this.ledgerOptions);

    // @todo: store the user info in a session
    const userInfo = await this.ledger.getUserDataById(addressId, false);
    console.log(userInfo);
  }
}

export abstract class LedgerService {
  static provider: ClassProvider = {
    provide: LedgerService,
    useClass: LedgerServiceImpl,
  };

  abstract connect(addressId: number): Promise<void>
}
