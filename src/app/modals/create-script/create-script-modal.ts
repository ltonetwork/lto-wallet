import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateScriptComponent } from './create-script.component';
import { toPromise } from '@app/core';

@Injectable()
export class CreateScriptModal {
  constructor(private _matDialog: MatDialog) {}

  async show() {
    const dialog = this._matDialog.open(CreateScriptComponent);
    return toPromise(dialog.afterClosed());
  }
}
