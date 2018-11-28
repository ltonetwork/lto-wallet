import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingsComponent } from './settings.component';
import { Account } from 'lto-api';

@Injectable()
export class SettingsModal {
  constructor(private matDialog: MatDialog) {}

  show(wallet: Account) {
    const dialog = this.matDialog.open(SettingsComponent, {
      width: '750px',
      data: wallet
    });
  }
}
