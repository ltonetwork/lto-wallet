import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeeInputModalComponent } from './fee-input-modal.component';

@Injectable()
export class FeeInputModal {
  constructor(private matDialog: MatDialog) {}

  show(hash: string): Promise<number | void> {
    const dialog = this.matDialog.open(FeeInputModalComponent, {
      width: '640px',
      data: hash,
    });

    return dialog.afterClosed().toPromise();
  }
}
