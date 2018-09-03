import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([])],
  declarations: [TransactionComponent]
})
export class TransactionModule {}
