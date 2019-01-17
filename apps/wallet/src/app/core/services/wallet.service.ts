import { Injectable, Inject, ClassProvider } from '@angular/core';
import { Observable, timer, Subject, merge, zip, of, combineLatest } from 'rxjs';
import {
  shareReplay,
  share,
  switchMapTo,
  switchMap,
  map,
  filter,
  withLatestFrom,
  catchError
} from 'rxjs/operators';
import { PublicNode } from './public-node';
import { AuthService } from './auth.service';
import { Account } from 'lto-api';
import { TransactionTypes } from '../transaction-types';
import { BridgeService } from './bridge.service';
import { transactionsFilter, toPromise } from '../utils';
import { AMOUNT_DIVIDER } from '../../tokens';

export interface IBalance {
  regular: number;
  generating: number;
  available: number;
  effective: number;
  /**
   * All numbers in balance come in INT form.
   * To make them human readable we need to divide them by AMOUNT_DIVIDER
   */
  amountDivider: number;
}

export interface ITransferPayload {
  amount: number;
  fee: number;
  attachment?: string;
  recipient: string;
}

/**
 * TODO: Refactor Wallet to handle situations when auth.wallet is null
 */
@Injectable()
export class WalletServiceImpl implements WalletService {
  balance$: Observable<IBalance>;

  transactions$: Observable<LTO.Transaction[]>;
  transfers$: Observable<LTO.Page<LTO.Transaction>>;
  leasingTransactions$: Observable<any[]>;
  dataTransactions$: Observable<any[]>;
  anchors$: Observable<LTO.Page<LTO.Transaction>>;

  address$: Observable<string>;

  private polling$: Observable<number> = timer(0, 5000).pipe(share());
  private manualUpdate$ = new Subject<any>();

  private update$: Observable<Account>;
  private unconfirmed$: Observable<LTO.Transaction[]>;

  constructor(
    private publicNode: PublicNode,
    private auth: AuthService,
    private bridgeService: BridgeService,
    @Inject(AMOUNT_DIVIDER) private amountDivider: number
  ) {
    this.address$ = auth.wallet$.pipe(
      filter((account): account is Account => !!account),
      map(account => account.address)
    );

    this.update$ = merge(this.polling$, this.manualUpdate$).pipe(
      switchMapTo(auth.wallet$),
      filter((account): account is Account => !!account),
      shareReplay(1)
    );

    this.balance$ = this.update$.pipe(
      switchMap(wallet => publicNode.balanceOf(wallet.address)),
      map(rawBalance => {
        return {
          ...rawBalance,
          amountDivider // mixin divider to easy access from components
        };
      }),
      shareReplay(1)
    );

    this.unconfirmed$ = this.address$.pipe(
      switchMap(address => {
        return publicNode.unconfirmedTransactions().pipe(
          map(transactions => {
            return this.filterOutAccountTransactions(address, transactions);
          })
        );
      })
    );

    this.transactions$ = this.update$.pipe(
      switchMap(wallet => {
        return zip(this.unconfirmed$, publicNode.transactionsOf(wallet.address));
      }),
      map(([unconfirmed, confirmed]) => {
        return [...unconfirmed, ...confirmed];
      }),
      shareReplay(1)
    );

    this.transfers$ = this.update$.pipe(
      switchMap(wallet => {
        return zip(
          publicNode.indexedTransactions(wallet.address, 'transfer'),
          this.unconfirmed$.pipe(
            map(transactionsFilter(TransactionTypes.TRANSFER, TransactionTypes.MASS_TRANSFER))
          )
        );
      }),
      map(([transferTransactions, unconfirmed]) => {
        return {
          total: transferTransactions.total,
          items: [...transferTransactions.items, ...unconfirmed]
        };
      })
    );

    this.leasingTransactions$ = this.update$.pipe(
      switchMap(wallet => {
        return combineLatest(
          publicNode
            .activeLease(wallet.address)
            .pipe(catchError(err => of([] as LTO.Transaction[]))),
          this.transactions$
        );
      }),
      map(([leaseTransactions, allTransactions]) => {
        // For this endpoint we receive transactions without status
        // we need to set it automatically
        const activeLease = leaseTransactions.map((transaction: LTO.Transaction) => {
          return {
            ...transaction,
            status: 'active'
          };
        });
        const cancelLease = transactionsFilter(TransactionTypes.CANCEL_LEASING)(allTransactions);
        // We need to filter out "unconfirmed" transactions
        const unconfirmedLease = transactionsFilter(TransactionTypes.LEASING)(
          allTransactions
        ).filter(transaction => transaction.unconfirmed);

        // New endpoint does not return 'canceled lease' so we need to take them from
        // allTransactions aswel
        const canceledLease = transactionsFilter(TransactionTypes.LEASING)(allTransactions).filter(
          transaction => transaction.status === 'canceled'
        );

        // "Unconfirmed" lease tranasactions have status === 'canceled' for a some reason
        // So we need to merge  "unconfirmedLease" and "canceledLease" and remove doubles
        const uniqueLease = [...unconfirmedLease, ...canceledLease].reduce(
          (obj, transaction) => {
            return {
              ...obj,
              [transaction.id]: transaction
            };
          },
          {} as any
        );
        return [...activeLease, ...cancelLease, ...Object.values(uniqueLease)];
      })
    );

    this.dataTransactions$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.ANCHOR))
    );

    this.anchors$ = this.update$.pipe(
      switchMap(wallet => {
        return zip(
          publicNode.indexedTransactions(wallet.address, 'anchor'),
          this.unconfirmed$.pipe(
            map(transactionsFilter(TransactionTypes.ANCHOR, TransactionTypes.ANCHOR_NEW))
          )
        );
      }),
      map(([anchors, unconfirmedAnchors]) => {
        return {
          total: anchors.total,
          items: [...anchors.items, ...unconfirmedAnchors]
        };
      }),
      shareReplay(1)
    );

    this.balance$.subscribe(); // make balance hot
  }

  async transfer(data: ITransferPayload) {
    const { fee, amount } = data;
    const wallet: any = await toPromise(this.auth.wallet$);
    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'transfer',
      {
        ...data,
        fee: fee * this.amountDivider,
        amount: amount * this.amountDivider
      },
      wallet.getSignKeys()
    );
    // Trigger update
    this.manualUpdate$.next();
  }

  async withdraw(recipient: string, amount: number, fee: number, captha: string) {
    // Create a bridge
    const bridgeAddress = await toPromise(this.bridgeService.withdrawTo(recipient, captha));
    // Make a transaction
    return this.transfer({
      amount,
      recipient: bridgeAddress,
      fee: fee / this.amountDivider
    });
  }

  async lease(recipient: string, amount: number, fee: number): Promise<any> {
    const wallet: any = await toPromise(this.auth.wallet$);
    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'lease',
      {
        recipient,
        fee: fee * this.amountDivider,
        amount: amount * this.amountDivider
      },
      wallet.getSignKeys()
    );
    this.manualUpdate$.next();
  }

  async cancelLease(transactionId: string): Promise<any> {
    const wallet: any = await toPromise(this.auth.wallet$);
    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'cancelLeasing',
      {
        transactionId,
        fee: 25000000
      },
      wallet.getSignKeys()
    );
    this.manualUpdate$.next();
  }

  async anchor(hash: string, fee: number) {
    const wallet: any = await toPromise(this.auth.wallet$);

    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'anchor',
      {
        fee: fee * this.amountDivider,
        anchors: [hash]
      },
      wallet.getSignKeys()
    );
    // Trigger update
    this.manualUpdate$.next();
  }

  private filterOutAccountTransactions(address: string, unconfirmedTransactions: any[]): any[] {
    // Filter trasactions where current user involved
    return unconfirmedTransactions
      .filter(transaction => {
        if (transaction.sender === address || transaction.recipient === address) {
          return true;
        }

        if (transaction.transfers) {
          transaction.transfers.some((transfer: any) => transfer.recipient === address);
        }

        return false;
      })
      .map(transaction => {
        return {
          ...transaction,
          unconfirmed: true
        };
      });
  }
}

export abstract class WalletService {
  static provider: ClassProvider = {
    provide: WalletService,
    useClass: WalletServiceImpl
  };

  abstract balance$: Observable<IBalance>;
  abstract address$: Observable<string>;

  // Transactions history
  abstract transactions$: Observable<any[]>;
  abstract leasingTransactions$: Observable<any[]>;
  abstract dataTransactions$: Observable<any[]>;
  abstract transfers$: Observable<LTO.Page<LTO.Transaction>>; // Filtered by type 4 and 11
  abstract anchors$: Observable<LTO.Page<LTO.Transaction>>;

  abstract transfer(data: ITransferPayload): Promise<void>;
  abstract lease(recipient: string, amount: number, fee: number): Promise<any>;
  abstract cancelLease(transactionId: string): Promise<any>;
  abstract withdraw(address: string, ammount: number, fee: number, captha: string): Promise<any>;

  abstract anchor(hash: string, fee: number): Promise<void>;
}
