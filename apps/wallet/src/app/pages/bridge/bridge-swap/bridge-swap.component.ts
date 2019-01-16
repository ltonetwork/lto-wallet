import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { SwapType } from './swap-type';

@Component({
  selector: 'lto-wallet-bridge-swap',
  templateUrl: './bridge-swap.component.html',
  styleUrls: ['./bridge-swap.component.scss']
})
export class BridgeSwapComponent implements OnInit {
  step = 1;
  swapType!: SwapType;

  constructor(private _dialogRef: MatDialogRef<any>) {}

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
    } else {
      this.step = 5;
    }
  }

  close() {
    this._dialogRef.close();
  }
}
