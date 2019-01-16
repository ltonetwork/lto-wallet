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

  get isERC20ToMain(): boolean {
    return this.swapType === SwapType.ERC20_MAIN;
  }

  nextStepClick() {
    this.nextStep.next();
  }
}
