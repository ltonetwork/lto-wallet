import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';

import { SearchBoxModule, BlocksListModule, KeyvalueListModule } from './components';

import {
  DataTableCardModule,
  PageContentModule,
  TransactionsSectionModule,
  TransactionTableModule,
  AmountPipeModule,
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
    // Custom components
    SearchBoxModule,
    BlocksListModule,
    DataTableCardModule,
    PageContentModule,
    KeyvalueListModule,
    TransactionTableModule,
    TransactionsSectionModule,
    // Pipes
    AmountPipeModule,
  ],
})
export class SharedModule {}
