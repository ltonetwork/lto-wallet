import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BackupAccountModalComponent } from './backup-account-modal.component';

@Injectable()
export class BackupAccountModal {
  constructor(private matDialog: MatDialog) {}

  show() {
    this.matDialog.open(BackupAccountModalComponent, {
      width: '500px',
      maxWidth: '100%'
    });
  }
}
