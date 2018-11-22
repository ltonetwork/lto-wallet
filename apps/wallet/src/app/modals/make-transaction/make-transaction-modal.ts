import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MakeTransactionComponent } from './make-transaction.component';

@Injectable()
export class MakeTransactionModal {
  constructor(private _dialog: MatDialog) {}

  show() {
    this._dialog.open(MakeTransactionComponent, {
      width: '500px'
    });
  }
}
