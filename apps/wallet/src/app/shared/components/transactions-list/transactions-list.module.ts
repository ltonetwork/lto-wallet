import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AmountDividePipeModule, TypeLabelPipeModule } from '../../pipes';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [CommonModule, FlexLayoutModule, AmountDividePipeModule, TypeLabelPipeModule],
  exports: [TransactionsListComponent]
})
export class TransactionsListModule {}
