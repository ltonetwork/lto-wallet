import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list.component';
import { TransactionRowComponent } from './transaction-row/transaction-row.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmountDividePipe } from '@app/pipes/amount-divide/amount-divide.pipe';
import { TypeLabelPipe } from '@app/pipes/type-label/type-label.pipe';

@NgModule({
  declarations: [TransactionsListComponent, TransactionRowComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    AmountDividePipe,
    TypeLabelPipe
  ],
  exports: [TransactionsListComponent],
})
export class TransactionsListModule {}
