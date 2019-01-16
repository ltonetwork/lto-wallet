import { Component, OnInit } from '@angular/core';

import { SwapType } from './swap-type';

@Component({
  selector: 'lto-wallet-bridge-swap',
  templateUrl: './bridge-swap.component.html',
  styleUrls: ['./bridge-swap.component.scss']
})
export class BridgeSwapComponent implements OnInit {
  step = 1;
  swapType!: SwapType;

  constructor() {}

  ngOnInit() {}

  setSwapType(type: SwapType) {
    this.swapType = type;
  }

  gotoStep2() {
    this.step = 2;
  }

  selectSwapType(type: SwapType) {
    this.swapType = type;
    this.step = 3;
  }

  goToNextStep() {
    if (this.swapType === SwapType.ERC20_MAIN) {
      this.step = 4;
    }
  }

  close() {}
}
