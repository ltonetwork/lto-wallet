import { Component } from '@angular/core';
import { shareReplay, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Wallet } from '@wallet/core';
import { TransactionInfoModal } from '../../../shared';
import { MakeTransactionModal, ReceiveModal } from '@wallet/shared';

@Component({
  selector: 'lto-wallet-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions$: Observable<any[]>;
  unconfirmed$: Observable<any[]>;

  constructor(
    public wallet: Wallet,
    private transactionInfoModal: TransactionInfoModal,
    private makeTransactionModal: MakeTransactionModal,
    private receiveFundsModal: ReceiveModal
  ) {
    this.transactions$ = wallet.transfers$.pipe(
      switchMap(t => wallet.relpaceWithYOU(t)),
      switchMap(t => wallet.replaceAmount(t)),
      map(t => wallet.setRecipient(t)),
      map(t => wallet.groupByDate(t)),
      shareReplay(1)
    );

    this.unconfirmed$ = wallet.uncofirmed$.pipe(
      map(t => t.filter(transaction => transaction.type === 4 || transaction.type === 11)),
      switchMap(t => wallet.relpaceWithYOU(t)),
      switchMap(t => wallet.replaceAmount(t)),
      map(t => wallet.setRecipient(t)),
      shareReplay(1)
    );
  }

  showDetails(transaction: any) {
    this.transactionInfoModal.show(transaction);
  }

  makeTransaction() {
    this.makeTransactionModal.show();
  }

  receive() {
    this.receiveFundsModal.show();
  }
}
