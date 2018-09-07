import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, timer } from 'rxjs';
import { switchMap, shareReplay, take, map, switchMapTo, tap } from 'rxjs/operators';
import { Account } from 'lto-api';
import { AccountManagementService } from './account-management.service';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { AMOUNT_DIVIDER } from '@legalthings-one/component-kit';
import * as moment from 'moment';

export interface ITransferPayload {
  amount: number;
  fee: number;
  attachment: string;
  recipient: string;
}

@Injectable({ providedIn: 'root' })
export class Wallet {
  address$: Observable<string>;
  balance$: Observable<any>;

  // Transactions history
  transactions$: Observable<any[]>;
  leasingTransactions$: Observable<any[]>;
  dataTransactions$: Observable<any[]>;

  // Unconfirmed transactrions
  uncofirmed$: Observable<any[]>;

  public ltoAccount$: Observable<Account>;

  private polling$: Observable<number> = timer(0);
  private _update$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private accountManager: AccountManagementService,
    publicNode: LtoPublicNodeService,
    @Inject(AMOUNT_DIVIDER) private amountDivider: number
  ) {
    this.ltoAccount$ = accountManager.wallet$;

    this.balance$ = this.polling$.pipe(
      switchMapTo(this.ltoAccount$),
      switchMap(account => publicNode.balanceOf(account.address)),
      shareReplay(1)
    );

    this.transactions$ = this.polling$.pipe(
      switchMapTo(this.ltoAccount$),
      switchMap(wallet =>
        publicNode.transactionsOf(wallet.address, 200).pipe(map(results => results[0]))
      ),
      shareReplay(1)
    );

    this.leasingTransactions$ = this.transactions$.pipe(
      map(transactions =>
        transactions.filter(transaction => transaction.type === 8 || transaction.type === 9)
      ),
      shareReplay(1)
    );
    this.dataTransactions$ = this.transactions$.pipe(
      map(transactions => transactions.filter(transaction => transaction.type === 12)),
      shareReplay(1)
    );

    this.address$ = this.ltoAccount$.pipe(map(account => account.address));

    // Create unconfirmed transactions observable
    this.uncofirmed$ = this.polling$.pipe(switchMapTo(publicNode.unconfirmedTransactions()));
  }

  transfer(data: ITransferPayload): Promise<any> {
    const { fee, amount } = data;

    return this.ltoAccount$
      .pipe(
        switchMap(wallet => {
          return this.accountManager.ltoInstance.API.PublicNode.transactions.broadcast(
            'transfer',
            {
              ...data,
              fee: fee * this.amountDivider,
              amount: amount * this.amountDivider
            },
            wallet.getSignKeys()
          );
        }),
        tap(() => this._update$.next(null)),
        take(1)
      )
      .toPromise();
  }

  lease(recipient: string, amount: number, fee: number): Promise<any> {
    // Fee, amount, recipient
    return this.ltoAccount$
      .pipe(
        switchMap(wallet => {
          return this.accountManager.ltoInstance.API.PublicNode.transactions.broadcast(
            'lease',
            {
              recipient,
              fee: fee * this.amountDivider,
              amount: amount * this.amountDivider
            },
            wallet.getSignKeys()
          );
        }),
        tap(() => this._update$.next(null)),
        take(1)
      )
      .toPromise();
  }

  /**
   *
   * @param transactions - transactions
   */
  relpaceWithYOU(transactions: any[]) {}

  groupByDate(transactions: any[]): any[] {
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
        return moment(a.date, 'MMMM, D, YYYY').isBefore(moment(b.date, 'MMMM, D, YYYY')) ? 1 : -1;
      });
  }
}
