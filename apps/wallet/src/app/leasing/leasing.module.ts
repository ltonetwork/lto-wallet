import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { LeasingComponent } from './leasing.component';

@NgModule({
  declarations: [LeasingComponent],
  imports: [SharedModule]
})
export class LeasingModule {}
