import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AMOUNT_DIVIDER, ANCHOR_FEE } from '../../tokens';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';

@Component({
    selector: 'lto-wallet-fee-input-modal',
    templateUrl: './fee-input-modal.component.html',
    styleUrls: ['./fee-input-modal.component.scss'],
    standalone: false
})
export class FeeInputModalComponent {
  fee: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public hash: string,
    @Inject(AMOUNT_DIVIDER) private divider: number,
    @Inject(ANCHOR_FEE) private defaultFee: number,
    private _confirmationDialog: TransactionConfirmDialog,
    private _dialogRef: MatDialogRef<any>
  ) {
    this.fee = defaultFee / divider;
  }

  async closeDialog() {
    const confirmed = await this.confirm(this.fee);
    if (!confirmed) {
      return;
    }

    this._dialogRef.close(this.fee);
  }

  async confirm(fee: number): Promise<boolean> {
    return this._confirmationDialog.show(
      {
        title: 'Confirm anchor transaction',
        transactionData: [
          {
            label: 'Hash',
            value: this.hash,
          },
          {
            label: 'Fee',
            value: fee,
          },
        ],
      },
      700
    );
  }
}
