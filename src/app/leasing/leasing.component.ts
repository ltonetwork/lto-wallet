import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WalletService, TransactionTypes, transactionsFilter, toPromise } from '../core';
import { StartLeaseModal } from '../modals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionConfirmDialog } from '../components/transaction-confirmation-dialog';
import { AMOUNT_DIVIDER } from '@app/tokens';
import { TransactionQrDialog } from '@app/components/transaction-qr-dialog';

@Component({
    selector: 'lto-leasing',
    templateUrl: './leasing.component.html',
    styleUrls: ['./leasing.component.scss'],
    standalone: false
})
export class LeasingComponent implements OnInit {
  transactions$: Observable<any[]>;
  address$: Observable<string>;

  selectedTransaction: any = null;

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  constructor(
    private confirmDialog: TransactionConfirmDialog,
    private qrDialog: TransactionQrDialog,
    private wallet: WalletService,
    private startLeaseModal: StartLeaseModal,
    private snackbar: MatSnackBar,
    @Inject(AMOUNT_DIVIDER) private AMOUNT_DIVIDER: number
  ) {
    this.address$ = wallet.address$;
    this.transactions$ = wallet.leasingTransactions$.pipe(
      map((transactions) => {
        // Now we need to mark canceling transactions
        // First - get all canceling transactions
        const canceling = transactionsFilter(TransactionTypes.CANCEL_LEASING)(transactions).map(
          (transaction) => transaction.lease.id
        );

        // Get our leasing transactions
        const leasing = transactionsFilter(TransactionTypes.LEASING)(transactions);

        // Now we need to go through active leasing and if it is in process of canceling
        // mark it
        return leasing.map((transaction) => {
          return {
            ...transaction,
            isCanceling: canceling.indexOf(transaction.id) !== -1,
          };
        });
      })
    );
  }

  ngOnInit() {}

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }

  async startLease() {
    const balance = await toPromise(this.wallet.balance$);
    const leaseData = await this.startLeaseModal.show(balance.available);
    if (!leaseData) {
      return;
    }
    try {
      if (leaseData !== true) { // If leaseData is true it means the tx has been sent using a QR.
        await this.wallet.lease({ ...leaseData });
      }
      this.notify('New lease created');
    } catch (Err) {
      this.notify('Cannot lease');
      console.error(Err);
    }
  }

  async cancelLease(leaseTransaction: any) {
    if (!await toPromise(this.wallet.canSign$)) {
      await this._cancelLeaseViaQr(leaseTransaction);
      return;
    }

    const leaseData = await this.confirmDialog.show({
      title: 'Confirm transaction',
      transactionData: this._describeTransaction(leaseTransaction)
    });
    if (!leaseData) {
      return;
    }
    try {
      await this.wallet.cancelLease(leaseTransaction.id);
      this.notify('Lease has been canceled');
    } catch (err) {
      this.notify('Ooops. Something went wrong');
    }
  }

  private async _cancelLeaseViaQr(leaseTransaction: any) {
    const tx = this.wallet.prepareCancelLease(leaseTransaction.id)
    const send = await this.qrDialog.show({
      tx: {...tx, sender: await toPromise(this.wallet.address$)},
      transactionData: this._describeTransaction(leaseTransaction)
    });

    if (send) {
      this.notify('Lease has been canceled');
    }
  }

  private _describeTransaction(leaseTransaction: any) {
    return [
      {
        label: 'Amount',
        value: Number(leaseTransaction.amount) / this.AMOUNT_DIVIDER,
      },
      {
        label: 'Node Address',
        value: leaseTransaction.recipient,
      },
      {
        label: 'Unbonding time',
        value: '3000 Blocks (50 hours)',
      }
    ];
  }

  trackByFn(transaction: any) {
    return transaction.id;
  }

  private notify(message: string) {
    this.snackbar.open(message, 'DISMISS', {
      duration: 3000,
    });
  }
}
