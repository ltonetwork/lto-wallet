import { Component, OnInit, Inject } from '@angular/core';
import { BridgeService } from '../../../../core';
import { Observable, zip } from 'rxjs';
import { shareReplay, switchMap, map, take } from 'rxjs/operators';
import { WalletService, WAVES_ADDRESS_VALIDATOR } from '../../../../core';
import { UntypedFormControl, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'lto-wallet-swap-dialog',
    templateUrl: './swap-dialog.component.html',
    styleUrls: ['./swap-dialog.component.scss'],
    standalone: false
})
export class SwapDialogComponent implements OnInit {
  captcha = '';
  step0Captcha = '';
  wavesWallet = '';

  bridgeAddress$: Observable<string> | null = null;

  wavesAddressControl: UntypedFormControl;

  step = 0;
  constructor(
    private _bridge: BridgeService,
    private _wallet: WalletService,
    @Inject(WAVES_ADDRESS_VALIDATOR) wavesAddValidator: ValidatorFn
  ) {
    this.wavesAddressControl = new UntypedFormControl('', [wavesAddValidator]);
  }

  ngOnInit() {}

  async resolvedCaptcha(captchaResponse: string) {
    if (this.step === 0) {
      this.step0Captcha = captchaResponse;
    } else {
      this.captcha = captchaResponse;
    }
  }

  goToStep1() {
    // Generate Bridge address
    this.bridgeAddress$ = this._wallet.address$.pipe(
      switchMap(address => {
        return this._bridge.depositTo(address, this.step0Captcha, 'WAVES');
      }),
      shareReplay(1)
    );

    this.step = 1;
  }

  goToStep2(skipFaucet: boolean = false) {
    this.wavesWallet = this.wavesAddressControl.value;
    if (skipFaucet !== true) {
      this._bridge
        .faucet(this.wavesWallet, this.captcha)
        .pipe(take(1))
        .subscribe();
    }

    this.step = 2;
  }

  gotoStep3() {
    this.step = 3;
  }

  backToStep2() {
    this.step = 2;
  }
}
