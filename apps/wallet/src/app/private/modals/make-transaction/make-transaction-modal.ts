import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MakeTransactionComponent, TransferData } from './make-transaction.component';
import { toPromise } from '../../../core';

@Injectable()
export class MakeTransactionModal {
  constructor(private _dialog: MatDialog) {}

  show(balance: number): Promise<TransferData | void> {
    const dialog = this._dialog.open(MakeTransactionComponent, {
      width: '500px',
      data: balance
    });

    return toPromise(dialog.afterClosed());
  }
}
