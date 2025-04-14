import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingComponent } from './leasing.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TransactionConfirmationDialog } from '../components/transaction-confirmation-dialog';
import { TransactionQrDialog } from '../components/transaction-qr-dialog';
import { StartLeaseModal, StartLeaseModalModule } from '../modals';
import { RouterModule, Routes } from '@angular/router';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import {
  ContentSectionComponent,
  LoadingSpinnerComponent,
  TransactionDetailsComponent,
  TransactionsListModule
} from '@app/shared/components';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: LeasingComponent,
  }
];

@NgModule({
  declarations: [LeasingComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    RouterModule.forChild(routes),
    MatSidenavContainer,
    TransactionDetailsComponent,
    MatSidenav,
    ContentSectionComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    TransactionsListModule,
    LoadingSpinnerComponent,
    MatButton,
    StartLeaseModalModule,
  ],
  providers: [
    TransactionConfirmationDialog,
    TransactionQrDialog,
    StartLeaseModal
  ]
})
export class LeasingModule {}
