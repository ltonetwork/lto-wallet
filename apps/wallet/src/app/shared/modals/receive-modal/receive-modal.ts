import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ReceiveModalComponent } from './receive-modal.component';

@Injectable()
export class ReceiveModal {
  constructor(private _dialog: MatDialog) {}

  show() {
    this._dialog.open(ReceiveModalComponent, {
      width: '500px'
    });
  }
}
