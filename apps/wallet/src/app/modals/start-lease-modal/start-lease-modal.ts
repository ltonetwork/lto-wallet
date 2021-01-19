import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartLeaseModalComponent, LeaseData } from './start-lease-modal.component';

@Injectable()
export class StartLeaseModal {
  constructor(private dialog: MatDialog) { }

  show(balance: number): Promise<LeaseData | void> {
    return this.dialog
      .open(StartLeaseModalComponent, {
        minWidth: 'min(400px, 95vw)',
        maxWidth: '75%',
        width: '500px',

        data: balance,
      })
      .afterClosed()
      .toPromise();
  }
}
