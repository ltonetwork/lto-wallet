import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  TransactionConfirmationDialogComponent,
  TransactionConfirmDialogData,
} from './transaction-confirmation-dialog.component';
import { toPromise } from '@app/core';

@Injectable()
export class TransactionConfirmationDialog {
  constructor(private matDialog: MatDialog) {}

  show(dialogData: TransactionConfirmDialogData, width = 500): Promise<boolean> {
    return toPromise(
      this.matDialog
        .open(TransactionConfirmationDialogComponent, {
          width: `${width}px`,
          data: dialogData,
        })
        .afterClosed()
    );
  }
}
