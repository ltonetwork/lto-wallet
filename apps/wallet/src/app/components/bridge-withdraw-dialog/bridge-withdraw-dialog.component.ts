import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lto-wallet-bridge-withdraw-dialog',
  templateUrl: './bridge-withdraw-dialog.component.html',
  styleUrls: ['./bridge-withdraw-dialog.component.scss']
})
export class BridgeWithdrawDialogComponent implements OnInit {
  step: number = 1;

  captchaResponse: string = '';

  constructor() {}

  ngOnInit() {}

  resolvedCaptcha(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  transfer() {}
}
