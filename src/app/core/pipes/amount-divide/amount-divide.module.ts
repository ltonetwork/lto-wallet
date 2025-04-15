import { NgModule } from '@angular/core';
import { AmountDividePipe } from './amount-divide.pipe';

@NgModule({
  declarations: [AmountDividePipe],
  exports: [AmountDividePipe]
})
export class AmountDividePipeModule {}
