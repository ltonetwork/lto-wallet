import { Component, OnInit } from '@angular/core';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { shareReplay, map, combineLatest, filter, switchMap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { AccountManagementService } from '@wallet/core';
import * as moment from 'moment';
import { Account } from 'lto-api';

@Component({
  selector: 'lto-wallet-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  links = [
    {
      path: 'all',
      label: 'All'
    },
    {
      path: 'sent',
      label: 'Sent'
    },
    {
      path: 'received',
      label: 'Received'
    }
  ];

  transactions$: Observable<any[]>;
  filter$: BehaviorSubject<string> = new BehaviorSubject('all');

  constructor(
    private _publicNode: LtoPublicNodeService,
    private _accountManager: AccountManagementService
  ) {
    this.transactions$ = _accountManager.wallet$
      .pipe(
        filter((wallet): wallet is Account => !!wallet),
        switchMap(wallet => _publicNode.transactionsOf(wallet.address, 200))
      )
      .pipe(
        map(results => results[0]),
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

  setFilter(filter: string) {
    this.filter$.next(filter);
  }
}
