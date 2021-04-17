import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { SwapType } from './swap-type';
import { MakeTransactionModal } from '../../../modals';

@Component({
  selector: 'lto-wallet-bridge-swap',
  templateUrl: './bridge-swap.component.html',
  styleUrls: ['./bridge-swap.component.scss'],
})
export class BridgeSwapComponent implements OnInit {
  step = 2;
  swapType!: SwapType;

  constructor(private _dialogRef: MatDialogRef<any>, private makeTransactionModal: MakeTransactionModal) {}

  ngOnInit() {}

  setSwapType(type: SwapType) {
    this.swapType = type;
  }

  toBinanceCEX() {
    this._dialogRef.close();
    this.makeTransactionModal.show();
  }

  gotoStep2() {
    this.step = 2;
  }

  selectSwapType(type: SwapType) {
    this.swapType = type;
    if (this.swapType === SwapType.MAIN_BINANCEEXCHANGE) {
      // this.toBinanceCEX()
      this.step = 100;
    } else {
      this.step = 3;
    }
  }

  goToNextStep() {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.ERC20_BINANCE:
        this.step = 4;
        break;
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_ERC20:
        this.step = 5;
        break;
    }
  }

  close() {
    this._dialogRef.close();
  }
}
