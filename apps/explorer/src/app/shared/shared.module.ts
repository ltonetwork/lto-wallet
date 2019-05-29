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
  MatSnackBarModule,
  MatListModule,
  MatTooltipModule
} from '@angular/material';

import { SearchBoxModule, BlocksListModule, KeyvalueListModule } from './components';

import {
  DataTableCardModule,
  PageContentModule,
  TransactionsSectionModule,
  TransactionTableModule,
  AmountPipeModule
} from '@legalthings-one/component-kit';

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
    MatListModule,
    MatTooltipModule,
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
