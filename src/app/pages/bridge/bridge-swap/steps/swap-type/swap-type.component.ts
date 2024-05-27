import { Component, EventEmitter, Output } from '@angular/core';

import { SwapTokenType, SwapType } from '../../swap-type';


@Component({
  selector: 'lto-wallet-swap-type',
  templateUrl: './swap-type.component.html',
  styleUrls: ['./swap-type.component.scss']
})
export class SwapTypeComponent {
  @Output() selectType = new EventEmitter<SwapType>();

  selectedFrom: SwapTokenType | null = null;
  selectedTo: SwapTokenType | null = null;
  SwapTokenType = SwapTokenType;

  constructor() {}

  selectFrom(token: SwapTokenType) {
    this.selectedFrom = token;
    this.selectedTo = token === SwapTokenType.MAINNET ? SwapTokenType.ERC20 : SwapTokenType.MAINNET;
  }

  selectTo(token: SwapTokenType) {
    if (token === this.selectedFrom || token === SwapTokenType.ERC20 && this.selectedFrom && this.selectedFrom !== SwapTokenType.MAINNET) {
      return;
    }

    this.selectedTo = token;

    if (!this.selectedFrom) {
      this.selectedFrom = token === SwapTokenType.MAINNET ? SwapTokenType.ERC20 : SwapTokenType.MAINNET;
    }
  }

  nextStepClick() {
    if (this.selectedFrom && this.selectedTo) {
      const type = `${this.selectedFrom}->${this.selectedTo}` as SwapType;
      this.selectType.next(type);
    }
  }
}
