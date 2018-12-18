import { Injectable, Inject, ClassProvider } from '@angular/core';
import { Observable, timer, Subject, merge, zip } from 'rxjs';
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
      switchMap(
        wallet => {
          return zip(
            publicNode.unconfirmedTransactions(),
            publicNode.transactionsOf(wallet.address)
          );
        },
        (wallet, transactions) =>
          [wallet, transactions[0], transactions[1]] as [Account, any[], any[]]
      ),
      map(([wallet, unconfirmed, confirmed]) => {
        // Filter unconfirmed transactions for current wallet
        const myUnconfirmed = this.filterOutAccountTransactions(wallet, unconfirmed);

        return [...myUnconfirmed, ...confirmed];
      }),
      shareReplay(1)
    );

    this.transfers$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.TRANSFER, TransactionTypes.MASS_TRANSFER))
    );

    this.leasingTransactions$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.LEASING, TransactionTypes.CANCEL_LEASING))
    );

    this.dataTransactions$ = this.transactions$.pipe(
      map(transactionsFilter(TransactionTypes.ANCHOR))
    );

    this.groupedTransfers$ = this.transfers$.pipe(
      combineLatest(auth.wallet$),
      map(([transfers, wallet]) => replaceAmountFor((wallet as any).address)(transfers)),
      map(setRecipient),
      map(groupByDate)
    );

    this.anchors$ = this.update$.pipe(
      switchMap(wallet => {
        return zip(
          publicNode.indexedTransactions(wallet.address, 'anchor'),
          publicNode.unconfirmedTransactions().pipe(
            map(transactions => {
              const myUnconfirmed = this.filterOutAccountTransactions(wallet, transactions);
              const myUnconfirmedAnchors = transactionsFilter(
                TransactionTypes.ANCHOR,
                TransactionTypes.ANCHOR_NEW
              )(myUnconfirmed);
              return myUnconfirmedAnchors;
            })
          )
        );
      }),
      map(([anchors, unconfirmedAnchors]) => {
        return [...anchors, ...unconfirmedAnchors];
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

  private filterOutAccountTransactions(account: Account, unconfirmedTransactions: any[]): any[] {
    // Filter trasactions where current user involved
    return unconfirmedTransactions
      .filter(transaction => {
        const address = account.address;
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
  abstract transfers$: Observable<any[]>; // Filtered by type 4 and 11
  abstract anchors$: Observable<any[]>;

  abstract groupedTransfers$: Observable<any[]>; // Transactions grouped by date

  abstract transfer(data: ITransferPayload): Promise<void>;
  abstract lease(recipient: string, amount: number, fee: number): Promise<any>;
  abstract cancelLease(transactionId: string): Promise<any>;
  abstract withdraw(address: string, ammount: number, fee: number, captha: string): Promise<any>;

  abstract anchor(hash: string, fee: number): Promise<void>;
}
