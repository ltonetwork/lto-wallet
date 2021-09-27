import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionDetailsComponent } from './transaction-details.component';

import { AmountDividePipeModule, TypeLabelPipeModule } from '../../pipes';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    AmountDividePipeModule,
    MatDividerModule,
    TypeLabelPipeModule,
  ],
  declarations: [TransactionDetailsComponent],
  exports: [TransactionDetailsComponent],
})
export class TransactionDetailsModule {}
