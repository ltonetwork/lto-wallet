import { Component, OnInit } from '@angular/core';
import { BridgeService } from '../../../../core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'lto-wallet-swap-dialog',
  templateUrl: './swap-dialog.component.html',
  styleUrls: ['./swap-dialog.component.scss']
})
export class SwapDialogComponent implements OnInit {
  captcha = '';
  wavesWallet = '';

  bridgeAddress$: Observable<string> | null = null;

  step = 1;
  constructor(private _bridge: BridgeService) {}

  ngOnInit() {}

  async resolvedCaptcha(captchaResponse: string) {
    this.captcha = captchaResponse;
  }

  goToStep2() {
    this.bridgeAddress$ = this._bridge
      .depositTo(this.wavesWallet, this.captcha, 'WAVES')
      .pipe(shareReplay(1));
    this.step = 2;
  }

  gotoStep3() {
    this.step = 3;
  }

  backToStep2() {
    this.step = 2;
  }
}
