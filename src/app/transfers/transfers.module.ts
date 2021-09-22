import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';
import { TransfersComponent } from './transfers.component';

@NgModule({
  declarations: [TransfersComponent],
  imports: [SharedModule, RouterModule.forChild([])]
})
export class TransfersModule {}
