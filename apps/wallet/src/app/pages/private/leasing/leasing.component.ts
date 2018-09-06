import { Component, OnInit } from '@angular/core';
import { shareReplay, map, combineLatest } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Wallet } from '@wallet/core';
import { TransactionInfoModal } from '../../../shared';
import * as moment from 'moment';

@Component({
  selector: 'lto-wallet-leasing',
  templateUrl: './leasing.component.html',
  styleUrls: ['./leasing.component.scss']
})
export class LeasingComponent implements OnInit {
  transactions$: Observable<any[]>;

  constructor(private wallet: Wallet, private transactionInfoModal: TransactionInfoModal) {
    this.transactions$ = wallet.transactions$.pipe(map(wallet.groupByDate));
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

  showDetails(transaction: any) {
    this.transactionInfoModal.show(transaction);
  }
}
