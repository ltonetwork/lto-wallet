import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DepositModalComponent } from './deposit-modal.component';
import { toPromise } from '../../core';

@Injectable()
export class DepositModal {
  constructor(private matDialog: MatDialog) {}

  show(): Promise<boolean> {
    const dialog = this.matDialog.open(DepositModalComponent, {
      width: '500px',
      maxWidth: '100%'
    });
    return toPromise(dialog.afterClosed());
  }
}
