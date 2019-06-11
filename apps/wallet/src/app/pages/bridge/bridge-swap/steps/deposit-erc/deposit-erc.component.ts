import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BridgeService, etheriumAddressValidator, WalletService } from '../../../../../core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwapType } from '../../swap-type';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import * as bech32 from 'bech32';

@Component({
  selector: 'lto-wallet-deposit-erc',
  templateUrl: './deposit-erc.component.html',
  styleUrls: ['./deposit-erc.component.scss']
})
export class DepositErcComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter();

  captchaResponse = '';
  address$: Observable<string> | null = null;

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

  addressPlaceholder!: string;

  constructor(private _bridge: BridgeService, private _wallet: WalletService) {}

  ngOnInit() {}

  resolveCaptcha(response: string) {
    this.captchaResponse = response;
    const tokenType = this.swapType === SwapType.ERC20_MAIN ||  this.swapType === SwapType.ERC20_BINANCE ? 'LTO20' : 'BINANCE';
    const toTokenType = this.swapType === SwapType.ERC20_BINANCE ? 'BINANCE' : 'LTO';
    if (this.swapType === SwapType.ERC20_BINANCE) {
      this.address$ = this._bridge.depositTo('tbnb1308kms9e2r6rlcsp9wwgalfrhdpy25hxewh8wz', response, tokenType, toTokenType);
    } else {
      this.address$ = this._wallet.address$.pipe(
        switchMap(address => this._bridge.depositTo(address, response, tokenType, toTokenType))
      );
    }
  }

  closeClick() {
    this.close.next();
  }
}
