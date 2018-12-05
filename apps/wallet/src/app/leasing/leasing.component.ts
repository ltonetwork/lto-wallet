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
  activeTransactions$: Observable<any[]>;
  unconfirmedLeasing$: Observable<any[]>;

  transactions$: Observable<any[]>;

  constructor(
    private wallet: WalletService,
    private startLeaseModal: StartLeaseModal,
    private snackbar: MatSnackBar
  ) {
    this.activeTransactions$ = this.getActiveTransactions();

    this.unconfirmedLeasing$ = wallet.uncofirmed$.pipe(
      map(transactionsFilter(TransactionTypes.LEASING)),
      map(transactions =>
        transactions.map(transaction => {
          return {
            ...transaction,
            unconfirmed: true
          };
        })
      )
    );

    this.transactions$ = combineLatest(this.unconfirmedLeasing$, this.activeTransactions$).pipe(
      map(([unconfirmed, active]) => {
        return [...unconfirmed, ...active];
      }),
      shareReplay(1)
    );
  }

  ngOnInit() {}

  getActiveTransactions() {
    const cancelling$: Observable<string[]> = this.wallet.uncofirmed$.pipe(
      map(transactionsFilter(TransactionTypes.CANCEL_LEASING)),
      // Map canceling transaction into ID of leasing which is going to be canceled
      map(transactions => transactions.map((transaction: any) => transaction.lease.id))
    );

    const active$ = this.wallet.leasingTransactions$.pipe(
      map(transactions => {
        return transactions.filter(transaction => transaction.status === 'active');
      })
    );

    return combineLatest(active$, cancelling$).pipe(
      map(([active, cancelling]) => {
        // Now we need to mark active transactions that they are cancelling
        // to prevent user to cancel it twice
        if (!cancelling.length) {
          // There is no pending canceling
          return active;
        }

        return active.map((transaction: any) => {
          const isCanceling = cancelling.indexOf(transaction.id) !== -1;
          return {
            ...transaction,
            isCanceling
          };
        });
      }),
      shareReplay(1)
    );
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
