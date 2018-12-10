import { Injectable, Inject, ClassProvider } from '@angular/core';
import { Observable, timer, Subject, merge } from 'rxjs';
import {
  shareReplay,
  share,
  switchMapTo,
  switchMap,
  map,
  combineLatest,
  filter
} from 'rxjs/operators';
import { LtoPublicNodeService } from './lto-public-node.service';
import { AuthService } from './auth.service';
import { Account } from 'lto-api';
import { TransactionTypes } from '../transaction-types';
import { BridgeService } from './bridge.service';
import {
  groupByDate,
  replaceAmountFor,
  setRecipient,
  transactionsFilter,
  toPromise
} from '../utils';
import { AMOUNT_DIVIDER } from '../../tokens';

export interface IBalance {
  regular: number;
  generating: number;
  available: number;
  effective: number;
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

  transactions$: Observable<any[]>;
  transfers$: Observable<any[]>;
  leasingTransactions$: Observable<any[]>;
  dataTransactions$: Observable<any[]>;
  anchors$: Observable<any[]>;

  address$: Observable<string>;

  uncofirmed$: Observable<any[]>;
  unconfirmedLeasing$: Observable<any[]>;
  groupedTransfers$: Observable<any[]>; // Transactions grouped by date

  private polling$: Observable<number> = timer(0, 5000).pipe(share());
  private manualUpdate$ = new Subject<any>();

  private update$: Observable<Account>;

  constructor(
    private publicNode: LtoPublicNodeService,
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
      shareReplay(1)
    );

    this.transactions$ = this.update$.pipe(
      switchMap(wallet => publicNode.transactionsOf(wallet.address)),
      shareReplay(1)
    );

    this.transfers$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.TRANSFER, TransactionTypes.MASS_TRANSFER))
    );

    this.leasingTransactions$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.LEASING))
    );

    this.dataTransactions$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.ANCHOR))
    );

    this.uncofirmed$ = this.update$.pipe(
      switchMap(
        () => publicNode.unconfirmedTransactions(),
        (wallet, transactions) => [wallet, transactions] as [Account, any[]]
      ),
      map(([wallet, transactions]) => {
        // Filter trasactions where current user involved
        const myTransactions = transactions.filter(transaction => {
          const address = wallet.address;
          if (transaction.sender === address || transaction.recipient === address) {
            return true;
          }

          if (transaction.transfers) {
            transaction.transfers.some((transfer: any) => transfer.recipient === address);
          }

          return false;
        });

        // Mark transactions as unconfirmed to display in the UI
        const markedAsUnconfirmed = myTransactions.map(transaction => {
          return {
            ...transaction,
            unconfirmed: true
          };
        });

        return markedAsUnconfirmed;
      }),
      shareReplay(1)
    );

    this.unconfirmedLeasing$ = this.uncofirmed$.pipe(map(transactionsFilter(8, 9)));

    this.groupedTransfers$ = this.transfers$.pipe(
      combineLatest(auth.wallet$),
      map(([transfers, wallet]) => replaceAmountFor((wallet as any).address)(transfers)),
      map(setRecipient),
      map(groupByDate)
    );

    this.anchors$ = this.update$.pipe(
      switchMap(wallet => publicNode.indexedTransactions(wallet.address, 'anchor')),
      shareReplay(1)
    );

    this.balance$.subscribe(); // make balance hot
    this.uncofirmed$.subscribe(transactions => {
      console.log('Have new uncofirmeed', transactions);
    });
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

  async withdraw(recipient: string, amount: number, fee: number) {
    // Create a bridge
    const bridgeAddress = await toPromise(this.bridgeService.withdrawTo(recipient));
    // Make a transaction
    return this.transfer({
      amount,
      recipient: bridgeAddress,
      fee
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
        fee: 100000
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
  abstract transfers$: Observable<any[]>; // Filtered by type 4 and 11
  abstract anchors$: Observable<any[]>;

  // Unconfirmed transactrions
  abstract uncofirmed$: Observable<any[]>;
  abstract unconfirmedLeasing$: Observable<any[]>;
  abstract groupedTransfers$: Observable<any[]>; // Transactions grouped by date

  abstract transfer(data: ITransferPayload): Promise<void>;
  abstract lease(recipient: string, amount: number, fee: number): Promise<any>;
  abstract cancelLease(transactionId: string): Promise<any>;
  abstract withdraw(address: string, ammount: number, fee: number): Promise<any>;

  abstract anchor(hash: string, fee: number): Promise<void>;
}
