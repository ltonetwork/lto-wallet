import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LeaseDetailsModalComponent } from './lease-details-modal.component';

@Injectable()
export class LeaseDetailsModal {
  constructor(private dialog: MatDialog) {}

  show(transaction: any) {
    this.dialog.open(LeaseDetailsModalComponent, {
      data: transaction
    });
  }
}
