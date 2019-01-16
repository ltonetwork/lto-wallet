import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SwapType } from '../../swap-type';

@Component({
  selector: 'lto-wallet-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  @Input() swapType!: SwapType;
  @Output() nextStep = new EventEmitter();

  ercDesiting: number = 1000;

  get ltoReceving(): number {
    if (this.ercDesiting < 100) {
      return 0;
    }

    return this.ercDesiting - 100;
  }

  ltoWithdrawing = 1000;
  get burnedTokens(): number {
    return this.ltoWithdrawing / 2;
  }

  get ercReceving(): number {
    return this.ltoWithdrawing / 2;
  }

  get isERC20ToMain(): boolean {
    return this.swapType === SwapType.ERC20_MAIN;
  }

  nextStepClick() {
    this.nextStep.next();
  }
}
