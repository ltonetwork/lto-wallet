import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { SwapType } from './swap-type';
import { MakeTransactionModal } from '../../modals';

@Component({
    selector: 'lto-wallet-bridge-swap',
    templateUrl: './bridge-swap.component.html',
    styleUrls: ['./bridge-swap.component.scss'],
    standalone: false
})
export class BridgeSwapComponent implements OnInit {
  step = 2;
  swapType!: SwapType;

  constructor(
    private _dialogRef: MatDialogRef<any>,
    private makeTransactionModal: MakeTransactionModal,
  ) {}

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
      this.step = 100;
    } else {
      this.step = 3;
    }
  }

  goToNextStep() {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BEP20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.ERC20_BINANCE:
      case SwapType.ERC20_EQTY:
      case SwapType.BEP20_EQTY:
        this.step = 4;
        break;
      case SwapType.MAIN_EQTY:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_ERC20:
        this.step = 5;
        break;
      default:
        throw new Error(`No step for swap type: ${this.swapType}`);
    }
  }

  close() {
    this._dialogRef.close();
  }
}
