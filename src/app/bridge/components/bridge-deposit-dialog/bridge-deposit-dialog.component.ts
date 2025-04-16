import { Component, OnInit } from '@angular/core';
import { WalletService, BridgeService, toPromise } from '../../../core';

@Component({
    selector: 'lto-wallet-bridge-deposit-dialog',
    templateUrl: './bridge-deposit-dialog.component.html',
    styleUrls: ['./bridge-deposit-dialog.component.scss'],
    standalone: false
})
export class BridgeDepositDialogComponent implements OnInit {
  step = 1;
  bridgeAddress = '';
  captcha = '';

  constructor(private wallet: WalletService, private bridgeService: BridgeService) {}

  ngOnInit() {}

  async resolvedCaptcha(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  async createBridget() {
    const address = await toPromise(this.wallet.address$);
    this.bridgeAddress = await toPromise(this.bridgeService.depositTo(address, this.captcha));
    this.step = 2;
  }
}
