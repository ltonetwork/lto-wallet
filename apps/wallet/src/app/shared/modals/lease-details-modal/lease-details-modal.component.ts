import { Component, Inject } from '@angular/core';
import { Wallet } from '../../../core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lto-wallet-lease-details-modal',
  templateUrl: './lease-details-modal.component.html',
  styleUrls: ['./lease-details-modal.component.scss']
})
export class LeaseDetailsModalComponent {
  get isCancelable(): boolean {
    return this.transaction.type === 8 && this.transaction.status === 'active';
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public transaction: any,
    private wallet: Wallet,
    private dialogRef: MatDialogRef<any>
  ) {}

  async cancelLease() {
    try {
      await this.wallet.cancelLease(this.transaction.id);
      this.dialogRef.close();
    } catch (error) {
      console.error(error);
    }
  }
}
