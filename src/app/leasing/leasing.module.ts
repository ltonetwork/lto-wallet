import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeasingComponent } from './leasing.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { TransactionConfirmDialog } from '../components/transaction-confirmation-dialog';
import { TransactionQrDialog } from '../components/transaction-qr-dialog';
import { StartLeaseModal } from '../modals';

@NgModule({
  declarations: [LeasingComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatSnackBarModule
  ],
  providers: [
    TransactionConfirmDialog,
    TransactionQrDialog,
    StartLeaseModal
  ]
})
export class LeasingModule {}
