import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wallet/shared';
import { MatTabsModule, MatTableModule } from '@angular/material';
import {
  DataTableCardModule,
  TransactionTableModule,
  AmountPipeModule
} from '@legalthings-one/component-kit';

import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    SharedModule,
    MatTabsModule,
    MatTableModule,
    DataTableCardModule,
    TransactionTableModule,
    AmountPipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionsComponent
      }
    ])
  ],
  declarations: [TransactionsComponent]
})
export class TransactionsModule {}
