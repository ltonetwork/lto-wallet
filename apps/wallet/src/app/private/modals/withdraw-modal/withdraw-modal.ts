import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WithdrawModalComponent, WithdrawData } from './withdraw-modal.component';
import { toPromise } from '../../../core';

@Injectable()
export class WithdrawModal {
  constructor(private matDialog: MatDialog) {}

  show(balance: number): Promise<WithdrawData | void> {
    const dialog = this.matDialog.open(WithdrawModalComponent, {
      maxWidth: '100%',
      width: '500px',
      data: balance
    });
    return toPromise(dialog.afterClosed());
  }
}
