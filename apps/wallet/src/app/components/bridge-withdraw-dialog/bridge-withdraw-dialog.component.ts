import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lto-wallet-bridge-withdraw-dialog',
  templateUrl: './bridge-withdraw-dialog.component.html',
  styleUrls: ['./bridge-withdraw-dialog.component.scss']
})
export class BridgeWithdrawDialogComponent implements OnInit {
  step: number = 1;
  mainnetAmount = 0;

  get erc20Amount(): number {
    const amount = parseFloat(this.mainnetAmount + '');
    if (isNaN(amount)) {
      return 0;
    }
    return amount * 10;
  }

  captchaResponse: string = '';

  get cannotContinue(): boolean {
    return !this.captchaResponse || this.erc20Amount === 0;
  }

  constructor() {}

  ngOnInit() {}

  resolvedCaptcha(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  transfer() {}
}
