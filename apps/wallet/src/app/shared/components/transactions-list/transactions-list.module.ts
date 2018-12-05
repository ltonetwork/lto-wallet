import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './transactions-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AmountDividePipeModule, TypeLabelPipeModule } from '../../pipes';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    AmountDividePipeModule,
    TypeLabelPipeModule,
    MatButtonModule
  ],
  exports: [TransactionsListComponent]
})
export class TransactionsListModule {}
