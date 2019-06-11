import { Component, Output, EventEmitter } from '@angular/core';

import { SwapType } from '../../swap-type';

@Component({
  selector: 'lto-wallet-swap-type',
  templateUrl: './swap-type.component.html',
  styleUrls: ['./swap-type.component.scss']
})
export class SwapTypeComponent {
  @Output() selectType = new EventEmitter<SwapType>();

  selectedType: SwapType | null = null;
  SwapType = SwapType;

  get ercToMainActive(): boolean {
    return this.selectedType === SwapType.ERC20_MAIN;
  }

  get mainToErcActive(): boolean {
    return this.selectedType === SwapType.MAIN_ERC20;
  }

  constructor() {}

  selectERC20ToMain() {
    this.selectedType = SwapType.ERC20_MAIN;
  }

  selectMainToERC20() {
    this.selectedType = SwapType.MAIN_ERC20;
  }

  selectBinanceToMain() {
    this.selectedType = SwapType.BINANCE_MAIN;
  }

  selectMainToBinance() {
    this.selectedType = SwapType.MAIN_BINANCE;
  }

  selectERC20ToBinance() {
    this.selectedType = SwapType.ERC20_BINANCE;
  }

  nextStepClick() {
    if (this.selectedType) {
      this.selectType.next(this.selectedType);
    }
  }
}
