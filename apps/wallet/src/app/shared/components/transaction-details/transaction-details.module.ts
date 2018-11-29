import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionDetailsComponent } from './transaction-details.component';
import {
  MatIconModule,
  MatButtonModule,
  MatRippleModule,
  MatDividerModule
} from '@angular/material';
import { AmountDividePipeModule, TypeLabelPipeModule } from '../../pipes';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    AmountDividePipeModule,
    MatDividerModule,
    TypeLabelPipeModule
  ],
  declarations: [TransactionDetailsComponent],
  exports: [TransactionDetailsComponent]
})
export class TransactionDetailsModule {}
