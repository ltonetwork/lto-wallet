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
    this.transactions$ = wallet.transactions$.pipe(
      combineLatest(wallet.address$),
      map(([transactions, address]) => {
        // We need to calculate ammount
        // because for mass transactions we can send several parts
        return transactions.map((transaction: any) => ({
          ...transaction,
          sender: transaction.sender === address ? 'You' : transaction.sender,
          recipient: transaction.recipient === address ? 'You' : transaction.recipient,
          amount: this.calculateAmount(transaction, address)
        }));
      }),
      map((transactions: any[]) => {
        // Now we need to group them by date
        const grouped = transactions.reduce((group, transaction) => {
          const date = moment(transaction.timestamp).format('MMMM, D, YYYY');
          const dateGroup = group[date] || [];
          dateGroup.push(transaction);
          return {
            ...group,
            [date]: dateGroup
          };
        }, {});

        // After transaction have been grouped by date we need to ordrer them
        return Object.keys(grouped)
          .reduce(
            (flattened, date) => {
              return [
                ...flattened,
                {
                  date,
                  transactions: grouped[date]
                }
              ];
            },
            [] as any[]
          )
          .sort((a, b) => {
            return moment(a.date, 'MMMM, D, YYYY').isBefore(moment(b.date, 'MMMM, D, YYYY'))
              ? 1
              : -1;
          });
      }),
      shareReplay(1)
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

  showDetails(transaction: any) {
    this.transactionInfoModal.show(transaction);
  }
}
