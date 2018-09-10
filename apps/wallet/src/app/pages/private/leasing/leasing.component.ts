import { Component } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Wallet } from '@wallet/core';
import { StartLeaseModal, LeaseDetailsModal } from '../../../shared';

@Component({
  selector: 'lto-wallet-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent {
  transactions$: Observable<any[]>;
  unconfirmed$: Observable<any[]>;

  constructor(
    wallet: Wallet,
    private startLeaseModal: StartLeaseModal,
    private leaseDetails: LeaseDetailsModal
  ) {
    this.transactions$ = wallet.leasingTransactions$.pipe(
      switchMap(t => wallet.relpaceWithYOU(t)),
      map(wallet.groupByDate)
    );
    this.unconfirmed$ = wallet.uncofirmed$.pipe(
      switchMap(t => wallet.relpaceWithYOU(t)),
      map(transactions => transactions.filter(t => t.type === 8 || t.type === 9))
    );
  }

  startLease() {
    this.startLeaseModal.show();
  }

  showDetails(transaction: any) {
    this.leaseDetails.show(transaction);
  }
}
