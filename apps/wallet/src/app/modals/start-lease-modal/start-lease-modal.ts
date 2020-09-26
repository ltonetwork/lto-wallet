import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StartLeaseModalComponent, LeaseData } from './start-lease-modal.component';

@Injectable()
export class StartLeaseModal {
  constructor(private dialog: MatDialog) {}

  show(balance: number): Promise<LeaseData | void> {
    return this.dialog
      .open(StartLeaseModalComponent, {
        width: '500px',
        data: balance,
      })
      .afterClosed()
      .toPromise();
  }
}
