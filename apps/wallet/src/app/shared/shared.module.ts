import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AmountPipeModule } from '@legalthings-one/component-kit';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MakeTransactionModalModule,
  ReceiveModalModule,
  TransactionInfoModule,
  MyWalletInfoModalModule,
  StartLeaseModalModule
} from './modals';

@NgModule({
  exports: [
    CommonModule,
    StartLeaseModalModule,
    MakeTransactionModalModule,
    ReceiveModalModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AmountPipeModule,
    FlexLayoutModule,
    TransactionInfoModule,
    MyWalletInfoModalModule
  ],
  declarations: []
})
export class SharedModule {}
