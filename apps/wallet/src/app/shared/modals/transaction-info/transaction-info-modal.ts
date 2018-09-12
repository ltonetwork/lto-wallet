import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TransactionInfoComponent } from './transaction-info.component';

@Injectable()
export class TransactionInfoModal {
  constructor(private dialog: MatDialog) {}

  show(transaction: any) {
    this.dialog.open(TransactionInfoComponent, { width: '550px', data: transaction });
  }
}
