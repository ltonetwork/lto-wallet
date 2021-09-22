import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateScriptComponent } from './create-script.component';

@Injectable()
export class CreateScriptModal {
  constructor(private _matDialog: MatDialog) {}

  async show() {
    const dialog = this._matDialog.open(CreateScriptComponent);
    return dialog.afterClosed().toPromise();
  }
}
