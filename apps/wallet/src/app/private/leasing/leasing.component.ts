import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MyWallet } from '../../core';
import { map, shareReplay } from 'rxjs/operators';
import { StartLeaseModal } from '../../modals';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lto-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {
  activeTransactions$: Observable<any>;

  constructor(
    private wallet: MyWallet,
    private startLeaseModal: StartLeaseModal,
    private snackbar: MatSnackBar
  ) {
    this.activeTransactions$ = wallet.leasingTransactions$.pipe(
      map(transactions => {
        return transactions.filter(transaction => transaction.status === 'active');
      }),
      shareReplay(1)
    );
  }

  ngOnInit() {}

  async startLease() {
    const isCreated = await this.startLeaseModal.show();
    if (isCreated) {
      this.notify('New lease created');
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

  private notify(message: string) {
    this.snackbar.open(message, 'DISMISS', {
      duration: 3000
    });
  }
}
