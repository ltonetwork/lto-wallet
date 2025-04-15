import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list.component';
import { TransactionRowComponent } from './transaction-row/transaction-row.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AmountDividePipeModule, TypeLabelPipeModule } from 'src/app/core/pipes';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [TransactionsListComponent, TransactionRowComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AmountDividePipeModule,
    TypeLabelPipeModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [TransactionsListComponent],
})
export class TransactionsListModule {}
