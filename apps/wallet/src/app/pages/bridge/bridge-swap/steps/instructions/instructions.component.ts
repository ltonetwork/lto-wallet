import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lto-wallet-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent {
  @Output() nextStep = new EventEmitter();

  nextStepClick() {
    this.nextStep.next();
  }
}
