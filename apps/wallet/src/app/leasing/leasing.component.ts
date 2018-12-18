import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { WalletService, TransactionTypes, transactionsFilter, toPromise } from '../core';
import { StartLeaseModal } from '../modals';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lto-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {
  transactions$: Observable<any[]>;
  address$: Observable<string>;

  selectedTransaction: any = null;

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  constructor(
    private wallet: WalletService,
    private startLeaseModal: StartLeaseModal,
    private snackbar: MatSnackBar
  ) {
    this.address$ = wallet.address$;
    this.transactions$ = wallet.leasingTransactions$.pipe(
      map(transactions => {
        // Now we need to mark canceling transactions
        // First - get all canceling transactions
        const canceling = transactionsFilter(TransactionTypes.CANCEL_LEASING)(transactions).map(
          transaction => transaction.lease.id
        );

        // Get our leasing transactions
        const leasing = transactionsFilter(TransactionTypes.LEASING)(transactions);

        // Now we need to go through active leasing and if it is in process of canceling
        // mark it
        return leasing.map(transaction => {
          return {
            ...transaction,
            isCanceling: canceling.indexOf(transaction.id) !== -1
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
      await this.wallet.lease(leaseData.recipient, leaseData.amount, leaseData.fee);
      this.notify('New lease created');
    } catch (Err) {
      this.notify('Cannot lease');
      console.error(Err);
    }
  }

  async cancelLease(leaseTransaction: any) {
    try {
      await this.wallet.cancelLease(leaseTransaction.id);
      this.notify('Lease has been canceled');
    } catch (err) {
      this.notify('Ooops. Something went wrong');
    }
  }

  trackByFn(transaction: any) {
    return transaction.id;
  }

  private notify(message: string) {
    this.snackbar.open(message, 'DISMISS', {
      duration: 3000
    });
  }
}
