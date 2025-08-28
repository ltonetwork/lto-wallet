import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { SwapTokenType, SwapType } from '../../swap-type';
import { BRIDGE_BEP2_ENABLED, BRIDGE_BSC_ENABLED, BRIDGE_EQTY_ENABLED } from '@app/tokens';


@Component({
    selector: 'lto-wallet-swap-type',
    templateUrl: './swap-type.component.html',
    styleUrls: ['./swap-type.component.scss'],
    standalone: false
})
export class SwapTypeComponent {
  @Output() selectType = new EventEmitter<SwapType>();

  selectedFrom: SwapTokenType | null = null;
  selectedTo: SwapTokenType | null = null;
  SwapTokenType = SwapTokenType;

  constructor(
    @Inject(BRIDGE_BSC_ENABLED) public bscEnabled: boolean,
    @Inject(BRIDGE_BEP2_ENABLED) public bep2Enabled: boolean,
    @Inject(BRIDGE_EQTY_ENABLED) public eqtyEnabled: boolean,
  ) {}

  selectFrom(token: SwapTokenType) {
    this.selectedFrom = token;
    this.selectedTo = null;
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
