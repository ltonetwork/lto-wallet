import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MakeTransactionComponent } from './make-transaction.component';
import { toPromise } from '@app/core';

@Injectable()
export class MakeTransactionModal {
  constructor(private _dialog: MatDialog) {}

  show(): Promise<void> {
    const dialog = this._dialog.open(MakeTransactionComponent, {
      width: '500px',
    });

    return toPromise(dialog.afterClosed());
  }
}
