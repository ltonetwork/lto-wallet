import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, timer, combineLatest } from 'rxjs';
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

  private polling$: Observable<number> = timer(0, 5000);

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
    this.uncofirmed$ = this.polling$.pipe(
      switchMapTo(combineLatest(this.address$, publicNode.unconfirmedTransactions())),
      map(([address, transactions]) => {
        return transactions.filter(transaction => {
          if (transaction.sender === address || transaction.recipient === address) {
            return true;
          }

          if (transaction.transfers) {
            transaction.transfers.some((transfer: any) => transfer.recipient === address);
          }

          return false;
        });
      })
    );
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
        take(1)
      )
      .toPromise();
  }

  cancelLease(transactionId: string): Promise<any> {
    return this.ltoAccount$
      .pipe(
        switchMap(wallet => {
          return this.accountManager.ltoInstance.API.PublicNode.transactions.broadcast(
            'cancelLeasing',
            {
              transactionId,
              fee: 100000
            },
            wallet.getSignKeys()
          );
        }),
        take(1)
      )
      .toPromise();
  }

  /**
   * Replace recipient/sender address with 'You' string if it is you
   * @param transactions - transactions
   */
  relpaceWithYOU(transactions: any[]): Observable<any[]> {
    return this.address$.pipe(
      map(address =>
        transactions.map(transaction => ({
          ...transaction,
          sender: transaction.sender === address ? 'You' : transaction.sender,
          recipient: transaction.recipient === address ? 'You' : transaction.recipient
        }))
      )
    );
  }

  /**
   * Because of ability to make "mass transactions" we need to calculate
   * amount for this particular user
   */
  replaceAmount(transactions: any[]): Observable<any[]> {
    return this.address$.pipe(
      map(address =>
        transactions.map((transaction: any) => ({
          ...transaction,
          amount: this.transactionAmount(transaction, address)
        }))
      )
    );
  }

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

  private transactionAmount(transaction: any, address: string): number {
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
}
