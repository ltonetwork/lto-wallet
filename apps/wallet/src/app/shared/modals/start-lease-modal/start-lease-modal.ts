import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StartLeaseModalComponent } from './start-lease-modal.component';

@Injectable()
export class StartLeaseModal {
  constructor(private dialog: MatDialog) {}

  show() {
    this.dialog.open(StartLeaseModalComponent, {
      width: '500px'
    });
  }
}
