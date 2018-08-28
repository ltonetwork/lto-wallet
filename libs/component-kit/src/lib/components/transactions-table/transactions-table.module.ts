import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material';
import { AmountPipeModule } from '../../pipes';
import { TransactionsTableComponent } from './transactions-table.component';

@NgModule({
  imports: [CommonModule, MatTableModule, RouterModule.forChild([]), AmountPipeModule],
  declarations: [TransactionsTableComponent],
  exports: [TransactionsTableComponent]
})
export class TransactionTableModule {}
