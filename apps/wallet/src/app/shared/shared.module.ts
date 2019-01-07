import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSuspenseModule } from 'ng-suspense';
import { MaterialModule } from './material.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
  ContentSectionModule,
  CredentialsFormModule,
  CopyableTextModule,
  LoadingSpinnerModule,
  TransactionDetailsModule,
  TransactionsListModule
} from './components';

import { AmountDividePipeModule, TypeLabelPipeModule, IsYouPipeModule } from './pipes';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ContentSectionModule,
    FlexLayoutModule,
    MaterialModule,
    CredentialsFormModule,
    CopyableTextModule,
    FormsModule,
    LoadingSpinnerModule,
    AmountDividePipeModule,
    TypeLabelPipeModule,
    IsYouPipeModule,
    TransactionDetailsModule,
    TransactionsListModule,
    NgSuspenseModule
  ]
})
export class SharedModule {}
