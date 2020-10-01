import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScriptInfoModalComponent } from './script-info-modal.component';

@Injectable()
export class ScriptInfoModal {
  constructor(private _matDialog: MatDialog) {}

  show() {
    this._matDialog.open(ScriptInfoModalComponent);
  }
}
