import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionConfirmationDialogComponent } from './transaction-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionConfirmDialog } from './transaction-confirmation.dialog';

@NgModule({
    declarations: [TransactionConfirmationDialogComponent],
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, FlexLayoutModule],
    providers: [TransactionConfirmDialog]
})
export class TransactionConfirmationDialogModule {}
