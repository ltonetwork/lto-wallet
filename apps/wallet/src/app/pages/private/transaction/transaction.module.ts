import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  TransactionComponent,
  TransactionModule as ExplorerTransactionModule
} from '@explorer/pages/transaction';

@NgModule({
  imports: [
    ExplorerTransactionModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: TransactionComponent
      }
    ])
  ],
  declarations: []
})
export class TransactionModule {}
