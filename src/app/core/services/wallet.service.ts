import { Injectable, Inject, ClassProvider } from '@angular/core';
import { Observable, timer, Subject, merge, zip, of, combineLatest } from 'rxjs';
import {
  shareReplay,
  share,
  switchMapTo,
  switchMap,
  map,
  filter,
  catchError
} from 'rxjs/operators';
import { PublicNode } from './public-node';
import { AuthService, IUserAccount } from './auth.service';
import { TransactionTypes } from '@app/core';
import { BridgeService, TokenType } from './bridge.service';
import { transactionsFilter, toPromise } from '../utils';
import { AMOUNT_DIVIDER } from '@app/tokens';
import { LedgerService } from './ledger.service';
import { Binary } from '@ltonetwork/lto';
import { Anchor, CancelLease, Lease, MassTransfer, Transfer } from '@ltonetwork/lto/transactions';

export interface IBalance {
  regular: number;
  generating: number;
  available: number;
  effective: number;
  /**
   * All numbers in balance come in INT form.
   * To make them human-readable we need to divide them by AMOUNT_DIVIDER
   */
  amountDivider: number;
}

export interface ITransferPayload {
  amount: number;
  fee: number;
  attachment?: string;
  recipient: string;
}

export interface IMassTransferPayload {
  fee: number;
  attachment?: string;
  transfers: IMassTransfer[];
}

export interface ILeasePayload {
  recipient: string;
  amount: number;
  fee: number;
}

export interface IAnchorPayload {
  hash: string;
  fee: number;
}

export interface IMassTransfer {
  amount: number;
  recipient: string;
}

/**
 * TODO: Refactor Wallet to handle situations when auth.wallet is null
 */
@Injectable({ providedIn: 'root' })
export class WalletService {
  balance$: Observable<IBalance>;
  transferFee$ = of(1);

  canSign$: Observable<boolean>;
  transactions$: Observable<LTO.Transaction[]>;
  transfers$: Observable<LTO.Page<LTO.Transaction>>;
  leasingTransactions$: Observable<any[]>;
  dataTransactions$: Observable<any[]>;
  anchors$: Observable<LTO.Page<LTO.Transaction>>;

  address$: Observable<string>;

  private polling$: Observable<number> = timer(0, 5000).pipe(share());
  private manualUpdate$ = new Subject<void>();

  private update$: Observable<string>;
  private unconfirmed$: Observable<LTO.Transaction[]>;

  constructor(
    private publicNode: PublicNode,
    private auth: AuthService,
    private bridgeService: BridgeService,
    private ledgerService: LedgerService,
    @Inject(AMOUNT_DIVIDER) private amountDivider: number
  ) {
    this.address$ = auth.account$.pipe(
      filter((account): account is IUserAccount => !!account),
      map(account => account.address)
    );

    this.canSign$ = this.address$.pipe(
      switchMapTo(combineLatest(this.auth.wallet$, this.auth.ledgerAccount$)),
      map(([wallet, ledgerAccount]) => !!wallet || !!ledgerAccount)
    );

    this.update$ = merge(this.polling$, this.manualUpdate$).pipe(
      switchMapTo(auth.account$),
      filter((account): account is IUserAccount => !!account),
      map(account => account.address),
      shareReplay(1)
    );

    this.balance$ = this.update$.pipe(
      switchMap(address => publicNode.balanceOf(address)),
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
      switchMap(address => {
        return zip(this.unconfirmed$, publicNode.transactionsOf(address));
      }),
      map(([unconfirmed, confirmed]) => {
        return [...unconfirmed, ...confirmed];
      }),
      shareReplay(1)
    );

    this.transfers$ = this.update$.pipe(
      switchMap(address => {
        return zip(
          publicNode.indexedTransactions(address, 'all_transfers'),
          this.unconfirmed$.pipe(
            map(transactionsFilter(TransactionTypes.TRANSFER, TransactionTypes.MASS_TRANSFER))
          )
        );
      }),
      map(([transferTransactions, unconfirmed]) => {
        const all = [...transferTransactions.items, ...unconfirmed];

        // Keep only the first transaction with each unique id
        const unique = Array.from(
          new Map(all.map(tx => [tx.id, tx])).values()
        );

        return {
          total: transferTransactions.total,
          items: unique
        };
      }),
      shareReplay(1)
    );

    this.leasingTransactions$ = this.update$.pipe(
      switchMap(address => {
        return combineLatest(
          publicNode
            .activeLease(address)
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
      switchMap(address => {
        return zip(
          publicNode.indexedTransactions(address, 'anchor'),
          this.unconfirmed$.pipe(
            map(transactionsFilter(TransactionTypes.ANCHOR))
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

  prepareTransfer(data: ITransferPayload): Transfer {
    const fee = Math.round(data.fee * this.amountDivider);
    const amount = Math.round(data.amount * this.amountDivider);

    const tx = new Transfer(data.recipient, amount, data.attachment);
    tx.fee = fee;

    return tx;
  }

  async transfer(data: ITransferPayload) {
    const wallet = await toPromise(this.auth.wallet$);
    const ledger = await toPromise(this.auth.ledgerAccount$);

    if (!wallet && !ledger) {
      throw new Error('No account connected');
    }

    const tx = this.prepareTransfer(data);

    if (ledger) {
      await this.ledgerService.signAndBroadcast(tx);
    } else if (wallet) {
      await tx.signWith(wallet).broadcastTo(this.auth.lto.node);
    }

    this.manualUpdate$.next();
  }

  prepareMassTransfer(data: IMassTransferPayload): MassTransfer {
    const fee = Math.round(data.fee * this.amountDivider);
    const transfers = data.transfers.map(transfer => ({
      recipient: transfer.recipient,
      amount: Math.round(transfer.amount * this.amountDivider)
    }));

    const tx = new MassTransfer(transfers, data.attachment);
    tx.fee = fee;
    tx.timestamp = Date.now();

    return tx;
  }

  async massTransfer(data: IMassTransferPayload) {
    const wallet = await toPromise(this.auth.wallet$);
    const ledger = await toPromise(this.auth.ledgerAccount$);

    if (!wallet && !ledger) {
      throw new Error('No account connected');
    }

    const tx = this.prepareMassTransfer(data);

    if (ledger) {
      await this.ledgerService.signAndBroadcast(tx);
    } else if (wallet) {
      await tx.signWith(wallet).broadcastTo(this.auth.lto.node);
    }

    this.manualUpdate$.next();
  }

  async withdraw(recipient: string, amount: number, fee: number, captcha: string, tokenType: TokenType = 'LTO20', attachment?: string) {
    const bridgeAddress = await toPromise(this.bridgeService.withdrawTo(recipient, captcha, tokenType));

    const data: any = {
      amount,
      recipient: bridgeAddress,
      fee: fee / this.amountDivider
    };

    if (attachment) {
      data.attachment = attachment;
    }

    return this.transfer(data);
  }

  prepareLease(data: ILeasePayload): Lease {
    const fee = Math.round(data.fee * this.amountDivider);
    const amount = Math.round(data.amount * this.amountDivider);

    const tx = new Lease(data.recipient, amount);
    tx.fee = fee;
    tx.timestamp = Date.now();

    return tx;
  }

  async lease(data: ILeasePayload): Promise<any> {
    const wallet = await toPromise(this.auth.wallet$);
    const ledger = await toPromise(this.auth.ledgerAccount$);

    if (!wallet && !ledger) {
      throw new Error('No account connected');
    }

    const tx = this.prepareLease(data);

    if (ledger) {
      await this.ledgerService.signAndBroadcast(tx);
    } else if (wallet) {
      await tx.signWith(wallet).broadcastTo(this.auth.lto.node);
    }

    this.manualUpdate$.next();
  }

  prepareCancelLease(transactionId: string): CancelLease {
    const tx = new CancelLease(transactionId);
    tx.timestamp = Date.now();

    return tx;
  }

  async cancelLease(transactionId: string): Promise<any> {
    const wallet = await toPromise(this.auth.wallet$);
    const ledger = await toPromise(this.auth.ledgerAccount$);

    if (!wallet && !ledger) {
      throw new Error('No account connected');
    }

    const tx = this.prepareCancelLease(transactionId);

    if (ledger) {
      await this.ledgerService.signAndBroadcast(tx);
    } else if (wallet) {
      await tx.signWith(wallet).broadcastTo(this.auth.lto.node);
    }

    this.manualUpdate$.next();
  }

  prepareAnchor(data: IAnchorPayload): Anchor {
    const fee = Math.round(data.fee * this.amountDivider);
    const hash = Binary.fromBase58(data.hash);

    const tx = new Anchor(hash);
    tx.fee = fee;
    tx.timestamp = Date.now();

    return tx;
  }

  async anchor(data: IAnchorPayload) {
    const wallet = await toPromise(this.auth.wallet$);
    const ledger = await toPromise(this.auth.ledgerAccount$);

    if (!wallet && !ledger) {
      throw new Error('No account connected');
    }

    const tx = this.prepareAnchor(data);

    if (ledger) {
      await this.ledgerService.signAndBroadcast(tx);
    } else if (wallet) {
      await tx.signWith(wallet).broadcastTo(this.auth.lto.node);
    }

    this.manualUpdate$.next();
  }

  private filterOutAccountTransactions(address: string, unconfirmedTransactions: any[]): any[] {
    // Filter transactions where current user involved
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
