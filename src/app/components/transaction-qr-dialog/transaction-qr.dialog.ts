import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  TransactionQrDialogComponent,
  TransactionQrDialogData
} from './transaction-qr-dialog.component';
import { TransactionTypes, WalletService } from '@app/core';
import { Observable } from 'rxjs';

@Injectable()
export class TransactionQrDialog {
  private tx?: {type: number, [_: string]: any};
  private dialog?: MatDialogRef<TransactionQrDialogComponent, any>;
  private transactions$: Observable<any[]>;

  constructor(
    private matDialog: MatDialog,
    private wallet: WalletService
  ) {
    this.transactions$ = this.wallet.transactions$;

    this.transactions$.subscribe({
      next: txs => {
        if (this.dialog && txs.find(tx => this.match(tx))) {
          this.dialog.close(true);
        }
      }
    });
  }

  show(dialogData: TransactionQrDialogData, width: number = 500): Promise<boolean> {
    this.tx = dialogData.tx as any;

    this.dialog = this.matDialog
      .open(TransactionQrDialogComponent, {
        width: `${width}px`,
        data: dialogData,
      });

    return this.dialog
      .afterClosed()
      .toPromise();
  }

  /**
   * A crude way to match the transaction.
   * To clean this up the tx id needs to be calculated.
   * This logic should be moved to the wallet service that for instance could return an
   *  Observable for a specific tx id from a function.
   */
  private match(transaction: LTO.Transaction) {
    if (!transaction.unconfirmed || transaction.type !== this.tx?.type) {
      return false;
    }

    switch (transaction.type) {
      case TransactionTypes.TRANSFER:
      case TransactionTypes.LEASING:
        return transaction.recipient === this.tx?.recipient && transaction.amount === this.tx?.amount;
      case TransactionTypes.CANCEL_LEASING:
        return transaction.leaseId === this.tx?.leaseId;
      case TransactionTypes.MASS_TRANSFER:
        return transaction.transfers === this.tx.transfers;
      case TransactionTypes.ANCHOR:
        return transaction.anchors.includes(this.tx.anchors[0]);
      default:
        return true;
    }
  }
}
