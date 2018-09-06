import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyWalletInfoModalComponent } from './my-wallet-info-modal.component';

@Injectable()
export class MyWalletInfoModal {
  constructor(private dialog: MatDialog) {}

  show() {
    this.dialog.open(MyWalletInfoModalComponent);
  }
}
