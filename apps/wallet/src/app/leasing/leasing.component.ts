import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { WalletService, TransactionTypes, transactionsFilter, toPromise, LedgerService } from '../core';
import { StartLeaseModal } from '../modals';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ContentDialogComponent } from '@wallet/components/content-dialog';

@Component({
  selector: 'lto-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss'],
})
export class LeasingComponent implements OnInit, OnDestroy {
  transactions$: Observable<any[]>;
  address$: Observable<string>;

  ledger$: Subscription;
  ledgerConnected: boolean = false;

  selectedTransaction: any = null;

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  constructor(
    private matDialog: MatDialog,
    private wallet: WalletService,
    private startLeaseModal: StartLeaseModal,
    private _ledgerService: LedgerService,
    private snackbar: MatSnackBar
  ) {
    this.ledger$ = this._ledgerService.connected$.subscribe(connected => this.ledgerConnected = connected);
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

  ngOnDestroy() {
    this.ledger$.unsubscribe();
  }

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }

  async startLease() {
    if (this.ledgerConnected) {
      return this.matDialog.open(ContentDialogComponent, {
        data: {
          title: 'Unable to sign with Ledger',
          content: `Signing a lease transaction using Ledger isn't supported yet`
        }
      });
    }

    const balance = await toPromise(this.wallet.balance$);
    const leaseData = await this.startLeaseModal.show(balance.available);
    if (!leaseData) {
      return;
    }
    try {
      await this.wallet.lease({ ...leaseData });
      this.notify('New lease created');
    } catch (Err) {
      this.notify('Cannot lease');
      console.error(Err);
    }
  }

  async cancelLease(leaseTransaction: any) {
    if (this.ledgerConnected) {
      return this.matDialog.open(ContentDialogComponent, {
        data: {
          title: 'Unable to sign with Ledger',
          content: `Signing a cancel lease transaction using Ledger isn't supported yet`
        }
      });
    }

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
      duration: 3000,
    });
  }
}
