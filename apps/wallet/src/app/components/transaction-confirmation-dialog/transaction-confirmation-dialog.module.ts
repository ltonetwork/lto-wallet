import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionConfirmationDialogComponent } from './transaction-confirmation-dialog.component';
import { MatDialogModule, MatButtonModule, MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionConfirmDialog } from './transaction-confirmation.dialog';

@NgModule({
  declarations: [TransactionConfirmationDialogComponent],
  entryComponents: [TransactionConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, FlexLayoutModule],
  providers: [TransactionConfirmDialog]
})
export class TransactionConfirmationDialogModule {}
