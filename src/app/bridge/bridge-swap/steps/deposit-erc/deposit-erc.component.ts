import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { BridgeService, WalletService } from '../../../../core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwapTokenType, SwapType } from '../../swap-type';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { bech32 } from 'bech32';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';

@Component({
    selector: 'lto-wallet-deposit-erc',
    templateUrl: './deposit-erc.component.html',
    styleUrls: ['./deposit-erc.component.scss'],
    standalone: false
})
export class DepositErcComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter<void>();

  shouldShowCaptcha = false;
  captchaResponse = '';
  address$: Observable<string> | null = null;
  depositForm!: UntypedFormGroup;

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'BEP-2';
      case SwapType.ERC20_EQTY:
        return 'EQTY';
      default:
        return 'MAINNET';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'yellow';
      case SwapType.ERC20_EQTY:
        return 'cyan';
      default:
        return 'purple';
    }
  }

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'BEP-2';
      case SwapType.BEP20_MAIN:
      case SwapType.MAIN_BEP20:
        return 'BEP-20';
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
      case SwapType.MAIN_EQTY:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'EQTY';
    }
  }

  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
      case SwapType.BEP20_MAIN:
      case SwapType.MAIN_BEP20:
        return 'yellow';
      case SwapType.MAIN_EQTY:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'cyan';
    }
  }

  get shouldSpecifyToAddress(): boolean {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return true;
      default:
        return false;
    }
  }

  addressPlaceholder!: string;

  constructor(
    private _bridge: BridgeService,
    private _wallet: WalletService,
    @Inject(RECAPTCHA_SETTINGS) private _recaptchaSettings: { siteKey: string }
  ) {}

  ngOnInit() {
    this.addressPlaceholder = this.swapType === SwapType.ERC20_BINANCE ? 'BEP-2' : 'LTO20';
    const addressValidators: ValidatorFn[] = [Validators.required];

    this.shouldShowCaptcha = !!this._recaptchaSettings.siteKey && !this.shouldSpecifyToAddress;
    console.log(this.shouldShowCaptcha);

    if (this.swapType === SwapType.ERC20_BINANCE) {
      addressValidators.push((ctrl: AbstractControl) => {
        const address = ctrl.value || '';
        try {
          const decodeAddress = bech32.decode(address);
          if (decodeAddress.prefix === 'tbnb' || decodeAddress.prefix === 'bnb') {
            return null;
          }

          return {
            invalidAddress: true
          };
        } catch (err) {
          return {
            invalidAddress: true
          };
        }
      });
    } else if (!this.shouldShowCaptcha) {
      this.resolveCaptcha('');
    }

    this.depositForm = new UntypedFormGroup({
      address: new UntypedFormControl('', addressValidators)
    });
  }

  resolveCaptcha(response: string) {
    this.captchaResponse = response;
    const [tokenType, toTokenType] = this.swapType.split('->') as [SwapTokenType, SwapTokenType];
    if (this.swapType === SwapType.ERC20_BINANCE) {
      this.address$ = this._bridge.depositTo(
        this.depositForm.value.address,
        response,
        tokenType,
        toTokenType
      );
    } else {
      this.address$ = this._wallet.address$.pipe(
        switchMap(address => this._bridge.depositTo(address, response, tokenType, toTokenType))
      );
    }
  }

  isInvalid(controlName: string) {
    const control = this.depositForm.controls[controlName];
    return control.dirty && control.invalid;
  }

  getFormErrors(): string[] {
    const errors = [];
    const addressCtrl = this.depositForm.controls.address;

    if (addressCtrl.dirty && addressCtrl.errors) {
      if (addressCtrl.errors.invalidAddress) {
        errors.push('Invalid address');
      }

      if (addressCtrl.errors.required) {
        errors.push('Address required');
      }
    }

    return errors;
  }

  closeClick() {
    this.close.next();
  }
}
