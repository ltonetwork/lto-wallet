import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BridgeService, etheriumAddressValidator, WalletService } from '../../../../../core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwapType } from '../../swap-type';
import { AbstractControl, ValidatorFn, Validators, FormGroup, FormControl } from '@angular/forms';
import * as bech32 from 'bech32';

@Component({
  selector: 'lto-wallet-deposit-erc',
  templateUrl: './deposit-erc.component.html',
  styleUrls: ['./deposit-erc.component.scss']
})
export class DepositErcComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter();

  shouldShowCaptcha = false;
  captchaResponse = '';
  address$: Observable<string> | null = null;
  depositForm!: FormGroup;

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'BINANCE';
      default:
        return 'MAINNET';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'yellow';
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
        return 'BINANCE';
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
        return 'yellow';
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

  constructor(private _bridge: BridgeService, private _wallet: WalletService) {}

  ngOnInit() {
    this.addressPlaceholder = this.swapType === SwapType.ERC20_BINANCE ? 'BINANCE' : 'LTO20';
    const addressValidators: ValidatorFn[] = [Validators.required];

    this.shouldShowCaptcha = !this.shouldSpecifyToAddress;

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
    }

    this.depositForm = new FormGroup({
      address: new FormControl('', addressValidators)
    });
  }

  resolveCaptcha(response: string) {
    this.captchaResponse = response;
    const tokenType =
      this.swapType === SwapType.ERC20_MAIN || this.swapType === SwapType.ERC20_BINANCE
        ? 'LTO20'
        : 'BINANCE';
    const toTokenType = this.swapType === SwapType.ERC20_BINANCE ? 'BINANCE' : 'LTO';
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
