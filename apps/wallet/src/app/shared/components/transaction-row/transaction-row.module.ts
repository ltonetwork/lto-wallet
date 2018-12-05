import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRowComponent } from './transaction-row.component';

@NgModule({
  declarations: [TransactionRowComponent],
  imports: [CommonModule],
  exports: [TransactionRowComponent]
})
export class TransactionRowModule {}
