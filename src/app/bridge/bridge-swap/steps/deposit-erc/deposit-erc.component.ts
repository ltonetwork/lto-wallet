import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { BridgeService, etheriumAddressValidator, WalletService } from '../../../../core';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

  // Captcha toggle (internal usage for transitions only)
  shouldShowCaptcha = false;
  captchaResponse = '';
  address$: Observable<string> | null = null;
  depositForm!: UntypedFormGroup;

  // UI state machine for this step
  // specifyToAddress: ask user for the destination address (for ERC20->BEP2/EQTY)
  // captcha: show captcha before generating address
  // address: show (and load) the generated deposit address
  // error: show an error if address generation failed
  state$ = new BehaviorSubject<'specifyToAddress' | 'captcha' | 'address' | 'error'>('captcha');
  addressError: string | null = null;

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'BEP-2';
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'EQTY';
      case SwapType.ERC20_MAIN:
        return 'MAINNET';
      default:
        throw new Error("Invalid swap type for this step");
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'yellow';
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'cyan';
      default:
        return 'purple';
    }
  }

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
      case SwapType.ERC20_EQTY:
      case SwapType.ERC20_MAIN:
        return 'ERC-20';
      case SwapType.BEP20_EQTY:
        return 'BEP-20';
      default:
        throw new Error("Invalid swap type for this step");
    }
  }

  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
      case SwapType.ERC20_EQTY:
      case SwapType.ERC20_MAIN:
        return 'blue';
      case SwapType.BEP20_EQTY:
        return 'yellow';
      default:
        throw new Error("Invalid swap type for this step");
    }
  }

  get otherTokenNetwork(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
      case SwapType.ERC20_EQTY:
      case SwapType.ERC20_MAIN:
        return 'Ethereum';
      case SwapType.BEP20_EQTY:
        return 'BSc';
      default:
        throw new Error("Invalid swap type for this step");
    }
  }

  get shouldSpecifyToAddress(): boolean {
    return this.swapType !== SwapType.ERC20_MAIN;
  }

  addressPlaceholder!: string;

  constructor(
    private _bridge: BridgeService,
    private _wallet: WalletService,
    @Inject(RECAPTCHA_SETTINGS) private _recaptchaSettings: { siteKey: string }
  ) {}

  ngOnInit() {
    this.addressPlaceholder = this.swapType === SwapType.ERC20_EQTY || SwapType.BEP20_EQTY ? 'BASE' : this.toTokenType;
    const addressValidators: ValidatorFn[] = [Validators.required];

    this.shouldShowCaptcha = !!this._recaptchaSettings.siteKey;

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
    } else {
      addressValidators.push(etheriumAddressValidator);
    }

    this.depositForm = new UntypedFormGroup({
      address: new UntypedFormControl('', addressValidators)
    });

    // Initialize state based on flow
    if (this.shouldSpecifyToAddress) {
      this.state$.next('specifyToAddress');
    } else if (this.shouldShowCaptcha) {
      this.state$.next('captcha');
    } else {
      this.obtainBridgeAddress();
    }
  }

  // Proceed from specifyToAddress state
  onNext() {
    if (this.shouldShowCaptcha) {
      this.state$.next('captcha');
    } else {
      this.obtainBridgeAddress();
    }
  }

  obtainBridgeAddress(captcha: string = '') {
    this.captchaResponse = captcha;
    this.addressError = null;
    const [tokenType, toTokenType] = this.swapType.split('->') as [SwapTokenType, SwapTokenType];

    if (this.shouldSpecifyToAddress) {
      this.address$ = this._bridge.depositTo(
        this.depositForm.value.address,
        captcha,
        tokenType,
        toTokenType
      ).pipe(
        tap(() => {}),
        catchError((err: any) => {
          this.addressError = (err && (err.message || err.error || err.toString())) || 'Failed to get deposit address';
          this.state$.next('error');
          return of('');
        })
      );
    } else {
      this.address$ = this._wallet.address$.pipe(
        switchMap(address => this._bridge.depositTo(address, captcha, tokenType, toTokenType)),
        tap(() => {}),
        catchError((err: any) => {
          this.addressError = (err && (err.message || err.error || err.toString())) || 'Failed to get deposit address';
          this.state$.next('error');
          return of('');
        })
      );
    }

    // Switch to address state; addressTpl will show a loader until value arrives
    this.state$.next('address');
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
