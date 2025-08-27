import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { BridgeService, etheriumAddressValidator, WalletService } from '@app/core';
import { DEFAULT_TRANSFER_FEE } from '@app/tokens';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { SwapType } from '../../swap-type';
import { bech32 } from 'bech32';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { TokenType } from '@app/core/services/bridge.service';

@Component({
    selector: 'lto-wallet-withdraw-form',
    templateUrl: './withdraw-form.component.html',
    styleUrls: ['./withdraw-form.component.scss'],
    standalone: false
})
export class WithdrawFormComponent implements OnInit, OnDestroy {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter<void>();

  withdrawForm!: UntypedFormGroup;
  shouldShowCaptcha = false;

  step = 'input';

  confirmed = false;
  captchaResponse = '';

  transfer$: Promise<any> | null = null;

  receiving$!: Observable<number>;

  burnFeeERC$: Observable<number>;
  burnFeeMain$: Observable<number>;

  get bridgeFee$(): Observable<number> {
    switch (this.swapType) {
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return this.burnFeeERC$;
      case SwapType.MAIN_EQTY:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return of(0);
      default:
        return this.burnFeeMain$;
    }
  }

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.BEP20_MAIN:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
        return 'BEP-2';
      case SwapType.MAIN_BEP20:
        return 'BEP-20';
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
      case SwapType.MAIN_EQTY:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'EQTY';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.BEP20_MAIN:
        return 'purple';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
      case SwapType.MAIN_BEP20:
        return 'yellow';
      case SwapType.MAIN_ERC20:
        return 'blue';
      case SwapType.MAIN_EQTY:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'cyan';
    }
  }

  BRIDGE_MINIMAL_FEE = 0;

  maxAmount = 0;

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.ERC20_BINANCE:
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

  get otherTokenStandard(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
      case SwapType.MAIN_EQTY:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.ERC20_BINANCE:
        return 'BEP-2';
      case SwapType.BEP20_MAIN:
      case SwapType.MAIN_BEP20:
        return 'BEP-20';
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
    }
  }
  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
      case SwapType.ERC20_BINANCE:
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

  addressPlaceholder!: string;

  private _subscriptions = new Subscription();

  get cannotSend(): boolean {
    return !this.confirmed || (this.shouldShowCaptcha && !this.captchaResponse);
  }

  constructor(
    private _wallet: WalletService,
    private _bridge: BridgeService,
    @Inject(DEFAULT_TRANSFER_FEE) private _transferFee: number,
    @Inject(RECAPTCHA_SETTINGS) private _recaptchaSettings: { siteKey: string },
  ) {
    this.burnFeeERC$ = this._bridge.burnFees$.pipe(map(fees => fees.lto20));
    this.burnFeeMain$ = this._bridge.burnFees$.pipe(map(fees => fees.lto));
  }

  ngOnInit() {
    switch (this.swapType) {
      case SwapType.MAIN_ERC20:
        this.addressPlaceholder = 'ETH';
        break;
      case SwapType.MAIN_BINANCE:
        this.addressPlaceholder = 'BEP-2';
        break;
      case SwapType.MAIN_BEP20:
        this.addressPlaceholder = 'BEP-20';
        break;
      case SwapType.MAIN_EQTY:
        this.addressPlaceholder = 'BASE';
        break;
    }

    this.shouldShowCaptcha = !!this._recaptchaSettings.siteKey;

    const addressValidators: ValidatorFn[] = [Validators.required];

    this.bridgeFee$.pipe(take(1)).subscribe(fee => (this.BRIDGE_MINIMAL_FEE = fee));

    if (this.swapType !== SwapType.MAIN_BINANCE) {
      addressValidators.push(etheriumAddressValidator);
    } else {
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
    }

    this.withdrawForm = new UntypedFormGroup({
      amount: new UntypedFormControl(
        null,
        [Validators.min(this.BRIDGE_MINIMAL_FEE), Validators.required],
        this.validateAmount.bind(this)
      ),
      address: new UntypedFormControl('', addressValidators),
      memo: new UntypedFormControl('')
    });

    this.receiving$ = this.withdrawForm.valueChanges.pipe(
      map(value => value.amount),
      withLatestFrom(this.bridgeFee$),
      map(([amount, burned]) => {
        if (amount < burned) {
          return 0;
        }
        return amount - burned;
      })
    );

    this._subscriptions.add(
      combineLatest(this._wallet.balance$, this._wallet.transferFee$).subscribe(
        ([balance, transferFee]) => {
          this.maxAmount =
            (balance.available - transferFee * balance.amountDivider) / balance.amountDivider;
        }
      )
    );
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  goToInputStep() {
    this.withdrawForm.enable();
    this.step = 'input';
    this.captchaResponse = '';
    this.confirmed = false;
  }

  goToConfirmation() {
    this.step = 'confirm';
    this.withdrawForm.disable();
  }

  solveCaptcha(response: string) {
    this.captchaResponse = response;
  }

  confirm() {
    this.confirmed = true;
  }

  transfer() {
    const { amount, address, memo } = this.withdrawForm.value;

    let tokenType: TokenType = 'LTO';
    switch (this.swapType) {
      case SwapType.MAIN_ERC20:
        tokenType = 'LTO20';
        break;
      case SwapType.MAIN_BINANCE:
        tokenType = 'BINANCE';
        break;
      case SwapType.MAIN_BEP20:
        tokenType = 'BSC';
        break;
      case SwapType.MAIN_EQTY:
        tokenType = 'EQTY';
        break;
      default:
        throw new Error('Invalid swap type');
    }
    this.transfer$ = this._wallet.withdraw(
      address,
      amount,
      this._transferFee,
      this.captchaResponse,
      tokenType,
      memo
    );
  }

  closeClick() {
    this.close.next();
  }

  isInvalid(controlName: string) {
    const control = this.withdrawForm.controls[controlName];
    return control.dirty && control.invalid;
  }

  validateAmount(ctrl: AbstractControl) {
    return combineLatest(this._wallet.balance$, this._wallet.transferFee$).pipe(
      map(([balance, transferFee]) => {
        const amount = ctrl.value * balance.amountDivider;
        const maxAmount = balance.available - transferFee * balance.amountDivider;
        const invalid = amount > maxAmount;
        return invalid ? { max: true } : null;
      }),
      take(1)
    );
  }

  getFormErrors(): string[] {
    const errors = [];
    const amountCtrl = this.withdrawForm.controls.amount;
    const addressCtrl = this.withdrawForm.controls.address;
    if (amountCtrl.dirty && amountCtrl.errors) {
      if (amountCtrl.errors.min) {
        errors.push('Amount cannot be less than ' + this.BRIDGE_MINIMAL_FEE);
      }

      if (amountCtrl.errors.max) {
        errors.push('Maximum amount is ' + this.maxAmount);
      }

      if (amountCtrl.errors.required) {
        errors.push('Amount required');
      }
    }

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
}
