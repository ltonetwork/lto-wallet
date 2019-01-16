import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BridgeSwapComponent } from './bridge-swap.component';

@NgModule({
  declarations: [BridgeSwapComponent],
  imports: [CommonModule],
  exports: [BridgeSwapComponent],
  entryComponents: [BridgeSwapComponent]
})
export class BridgeSwapModule {}
