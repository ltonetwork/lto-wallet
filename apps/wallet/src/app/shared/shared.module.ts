import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { NgSuspenseModule } from 'ng-suspense';

import { FlexLayoutModule, BREAKPOINTS, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';

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
    NgSuspenseModule,
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
    TransactionsListModule
  ]
})
export class SharedModule {}
