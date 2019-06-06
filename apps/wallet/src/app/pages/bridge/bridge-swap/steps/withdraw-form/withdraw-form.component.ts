import { Component, OnInit, Output, EventEmitter, Inject, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable, combineLatest, ReplaySubject, Subscription } from 'rxjs';
import { BridgeService, WalletService, etheriumAddressValidator } from '../../../../../core';
import { DEFAULT_TRANSFER_FEE } from '../../../../../tokens';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { SwapType } from '../../swap-type';
import * as bech32 from 'bech32';

@Component({
  selector: 'lto-wallet-withdraw-form',
  templateUrl: './withdraw-form.component.html',
  styleUrls: ['./withdraw-form.component.scss']
})
export class WithdrawFormComponent implements OnInit, OnDestroy {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter();

  withdrawForm!: FormGroup;

  step = 'input';

  confirmed = false;
  captchaResponse = '';

  transfer$: Promise<any> | null = null;

  burnRatePct$!: Observable<number>;
  burnedTokens$ = new ReplaySubject<number>(1);
  receiving$!: Observable<number>;

  BRIDGE_MINIMAL_FEE = 2.25;

  maxAmount = 0;

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'BINANCE';
    }
  }

  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'yellow';
    }
  }

  addressPlaceholder!: string;

  private _subscriptions = new Subscription();

  get cannotSend(): boolean {
    return !this.confirmed || !this.captchaResponse;
  }

  constructor(
    private _wallet: WalletService,
    private _bridge: BridgeService,
    @Inject(DEFAULT_TRANSFER_FEE) private _transferFee: number
  ) {}

  ngOnInit() {
    this.addressPlaceholder = this.swapType === SwapType.MAIN_ERC20 ? 'ETH' : 'BINANCE';
    this.burnRatePct$ = this._bridge.burnRate$.pipe(map(rate => rate * 100));

    const addressValidators: ValidatorFn[] = [Validators.required];

    if (this.swapType === SwapType.MAIN_ERC20) {
      addressValidators.push(etheriumAddressValidator);
    } else {
      addressValidators.push((ctrl: AbstractControl) => {
        const address = ctrl.value || '';
          try {
            const decodeAddress = bech32.decode(address);
            if (decodeAddress.prefix === 'tbnb' ||
              decodeAddress.prefix === 'bnb') {
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

    this.withdrawForm = new FormGroup({
      amount: new FormControl(
        this.BRIDGE_MINIMAL_FEE,
        [Validators.min(this.BRIDGE_MINIMAL_FEE), Validators.required],
        this.validateAmount.bind(this)
      ),
      address: new FormControl('', addressValidators)
    });

    this._subscriptions.add(
      this.withdrawForm.valueChanges
        .pipe(
          map(value => value.amount),
          withLatestFrom(this._bridge.burnRate$),
          map(([amount, burnRate]) => {
            const burned = amount * burnRate;
            return burned < this.BRIDGE_MINIMAL_FEE ? this.BRIDGE_MINIMAL_FEE : burned;
          })
        )
        .subscribe(this.burnedTokens$)
    );

    this.receiving$ = this.withdrawForm.valueChanges.pipe(
      map(value => value.amount),
      withLatestFrom(this.burnedTokens$),
      map(([amount, burned]) => {
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
    const { amount, address } = this.withdrawForm.value;
    const tokenType = this.swapType === SwapType.MAIN_ERC20 ? 'LTO20' : 'BINANCE';
    this.transfer$ = this._wallet.withdraw(
      address,
      amount,
      this._transferFee,
      this.captchaResponse,
      tokenType
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
        errors.push('Maxumum amount is ' + this.maxAmount);
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
