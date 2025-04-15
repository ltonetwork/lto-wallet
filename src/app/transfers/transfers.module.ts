import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared';
import { TransfersComponent } from './transfers.component';
import { DepositModalModule, MakeTransactionModalModule, WithdrawModalModule } from '@app/modals';
import {
  ContentSectionComponent,
  LoadingSpinnerComponent,
  TransactionDetailsComponent,
  TransactionsListModule
} from '@app/components';

const routes: Routes = [
  {
    path: '',
    component: TransfersComponent,
  }
];

@NgModule({
  declarations: [TransfersComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    MakeTransactionModalModule,
    WithdrawModalModule,
    DepositModalModule,
    TransactionDetailsComponent,
    ContentSectionComponent,
    TransactionsListModule,
    LoadingSpinnerComponent
  ]
})
export class TransfersModule {}
