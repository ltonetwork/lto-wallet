import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatDividerModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatTableModule,
  MatGridListModule,
  MatSidenavModule,
  MatTabsModule,
  MatSnackBarModule
} from '@angular/material';

import {
  SearchBoxModule,
  BlocksListModule,
  DataTableCardModule,
  PageContentModule,
  KeyvalueListModule,
  TransactionTableModule,
  TransactionsSectionModule
} from './components';

import { AmountPipeModule } from './pipes';

@NgModule({
  exports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatGridListModule,
    MatSidenavModule,
    MatTabsModule,
    MatSnackBarModule,
    // Custom components
    SearchBoxModule,
    BlocksListModule,
    DataTableCardModule,
    PageContentModule,
    KeyvalueListModule,
    TransactionTableModule,
    TransactionsSectionModule,
    // Pipes
    AmountPipeModule
  ]
})
export class SharedModule {}
