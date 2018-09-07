import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Wallet } from '@wallet/core';
import { TransactionInfoModal, StartLeaseModal } from '../../../shared';

@Component({
  selector: 'lto-wallet-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {
  transactions$: Observable<any[]>;
  unconfirmed$: Observable<any[]>;

  constructor(private wallet: Wallet, private startLeaseModal: StartLeaseModal) {
    this.transactions$ = wallet.leasingTransactions$.pipe(map(wallet.groupByDate));
    this.unconfirmed$ = wallet.uncofirmed$.pipe(
      map(transactions => transactions.filter(t => t.type === 8 || t.type === 9))
    );
  }

  ngOnInit() {}

  calculateAmount(transaction: any, address: string): number {
    if (transaction.type === 11) {
      // Mass transaction
      const amount = transaction.transfers.reduce((sum: number, transfer: any) => {
        return transaction.sender === address || transfer.recipient === address
          ? transfer.amount + sum
          : sum;
      }, 0);

      return amount;
    }

    return transaction.amount;
  }

  startLease() {
    this.startLeaseModal.show();
  }
}
