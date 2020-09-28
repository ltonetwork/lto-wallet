import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  TransactionConfirmationDialogComponent,
  TransactionConfirmDialogData,
} from './transaction-confirmation-dialog.component';

@Injectable()
export class TransactionConfirmDialog {
  constructor(private matDialog: MatDialog) {}

  show(dialogData: TransactionConfirmDialogData, width: number = 500): Promise<boolean> {
    return this.matDialog
      .open(TransactionConfirmationDialogComponent, {
        width: `${width}px`,
        data: dialogData,
      })
      .afterClosed()
      .toPromise();
  }
}
