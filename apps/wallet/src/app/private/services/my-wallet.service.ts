import { Injectable, Inject } from '@angular/core';
import { Observable, timer, Subject, merge } from 'rxjs';
import { shareReplay, map, switchMapTo, tap, share } from 'rxjs/operators';
import { AuthService, LtoPublicNodeService, BridgeService, TransactionTypes } from '../../core';
import { AMOUNT_DIVIDER } from '../../tokens';

import {
  groupByDate,
  replaceAmountFor,
  setRecipient,
  toPromise,
  transactionsFilter
} from '../../core/utils';

export interface ITransferPayload {
  amount: number;
  fee: number;
  attachment?: string;
  recipient: string;
}

@Injectable()
export class MyWalletImpl implements MyWallet {
  balance$: Observable<any>;

  transactions$: Observable<any[]>;
  transfers$: Observable<any[]>; // Filtered by type 4 and 11
  leasingTransactions$: Observable<any[]>;
  dataTransactions$: Observable<any[]>;
  anchors$: Observable<any[]>;

  uncofirmed$: Observable<any[]>;
  unconfirmedLeasing$: Observable<any[]>;
  groupedTransfers$: Observable<any[]>; // Transactions grouped by date

  /**
   * Polling interval.
   * TODO: Inject interval amount
   */
  private polling$: Observable<number> = timer(0, 5000).pipe(share());
  private manualUpdate$ = new Subject<any>();

  private update$: Observable<void>;

  constructor(
    private auth: AuthService,
    private publicNode: LtoPublicNodeService,
    private bridgeService: BridgeService,
    @Inject(AMOUNT_DIVIDER) private amountDivider: number
  ) {
    this.update$ = merge(this.polling$, this.manualUpdate$).pipe(shareReplay(1));

    this.balance$ = this.update$.pipe(
      switchMapTo(publicNode.balanceOf(auth.wallet.address)),
      shareReplay(1)
    );

    this.balance$.subscribe(); // make balance hot

    this.transactions$ = this.update$.pipe(
      switchMapTo(publicNode.transactionsOf(auth.wallet.address)),
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
      switchMapTo(publicNode.unconfirmedTransactions()),
      map(transactions => {
        return transactions.filter(transaction => {
          const address = auth.wallet.address;
          if (transaction.sender === address || transaction.recipient === address) {
            return true;
          }

          if (transaction.transfers) {
            transaction.transfers.some((transfer: any) => transfer.recipient === address);
          }

          return false;
        });
      }),
      shareReplay(1)
    );

    this.unconfirmedLeasing$ = this.uncofirmed$.pipe(map(transactionsFilter(8, 9)));

    this.groupedTransfers$ = this.transfers$.pipe(
      map(replaceAmountFor(auth.wallet.address)),
      map(setRecipient),
      map(groupByDate)
    );

    this.anchors$ = this.update$.pipe(
      switchMapTo(publicNode.indexedTransactions(auth.wallet.address, 'anchor')),
      shareReplay(1)
    );
  }

  async transfer(data: ITransferPayload) {
    const { fee, amount } = data;
    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'transfer',
      {
        ...data,
        fee: fee * this.amountDivider,
        amount: amount * this.amountDivider
      },
      this.auth.wallet.getSignKeys()
    );
    // Trigger update
    this.manualUpdate$.next();
  }

  async lease(recipient: string, amount: number, fee: number): Promise<any> {
    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'lease',
      {
        recipient,
        fee: fee * this.amountDivider,
        amount: amount * this.amountDivider
      },
      this.auth.wallet.getSignKeys()
    );
    this.manualUpdate$.next();
  }

  async cancelLease(transactionId: string): Promise<any> {
    await this.auth.ltoInstance.API.PublicNode.transactions.broadcast(
      'cancelLeasing',
      {
        transactionId,
        fee: 100000
      },
      this.auth.wallet.getSignKeys()
    );
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
}

export abstract class MyWallet {
  static provider = {
    provide: MyWallet,
    useClass: MyWalletImpl
  };

  abstract balance$: Observable<any>;

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
}
