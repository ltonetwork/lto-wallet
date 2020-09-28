import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisableScriptComponent } from './disable-script.component';

@Injectable()
export class DisableScriptModal {
  constructor(private _matDialog: MatDialog) {}

  show(fee: number): Promise<boolean> {
    return this._matDialog.open(DisableScriptComponent, { data: fee }).afterClosed().toPromise();
  }
}
