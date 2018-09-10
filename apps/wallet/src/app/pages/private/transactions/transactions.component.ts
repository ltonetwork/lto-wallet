import { Component } from '@angular/core';
import { shareReplay, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Wallet } from '@wallet/core';
import { TransactionInfoModal } from '../../../shared';

@Component({
  selector: 'lto-wallet-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions$: Observable<any[]>;
  unconfirmed$: Observable<any[]>;

  constructor(wallet: Wallet, private transactionInfoModal: TransactionInfoModal) {
    this.transactions$ = wallet.transactions$.pipe(
      switchMap(t => wallet.relpaceWithYOU(t)),
      switchMap(t => wallet.replaceAmount(t)),
      map(t => wallet.setRecipient(t)),
      map(t => wallet.groupByDate(t)),
      shareReplay(1)
    );

    this.unconfirmed$ = wallet.uncofirmed$.pipe(
      switchMap(t => wallet.relpaceWithYOU(t)),
      switchMap(t => wallet.replaceAmount(t)),
      map(t => wallet.setRecipient(t)),
      map(t => wallet.groupByDate(t)),
      shareReplay(1)
    );
  }

  showDetails(transaction: any) {
    this.transactionInfoModal.show(transaction);
  }
}
