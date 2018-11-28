import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AccountInfoComponent } from './account-info.component';
import { Account } from 'lto-api';

@Injectable()
export class AccountInfoModal {
  constructor(private dialog: MatDialog) {}

  show(account: Account) {
    const dialog = this.dialog.open(AccountInfoComponent, {
      width: '500px',
      data: account
    });
  }
}
