import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletConnectModalComponent } from './wallet-connect-modal.component';
import { toPromise } from '@app/core';

@Injectable()
export class WalletConnectModal {
  constructor(private matDialog: MatDialog) {}

  show(): Promise<void> {
    const dialog = this.matDialog.open(WalletConnectModalComponent, {
      maxWidth: '100%',
      width: '500px',
    });
    return toPromise(dialog.afterClosed());
  }
}
