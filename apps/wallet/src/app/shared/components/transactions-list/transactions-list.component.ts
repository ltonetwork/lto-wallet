import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { groupByDate, TransactionsGroup, replaceAmountFor } from '../../../core';

@Component({
  selector: 'lto-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit, OnChanges {
  @Input('transactions') transactionsArray!: any[];
  @Input('address') address!: string;
  @Input('selectedId') selectedId!: string;

  @Output() transactionClick = new EventEmitter();

  transactions: TransactionsGroup[] = [];

  constructor() {}

  ngOnInit() {
    this.processTransactions();
  }

  ngOnChanges() {
    this.processTransactions();
  }

  groupDayTrackBy(index: number, group: TransactionsGroup) {
    return group.transactions.length;
  }

  transactionTrackBy(index: number, transaction: any) {
    return transaction.id;
  }

  _transactionClick(transaction: any) {
    this.transactionClick.next(transaction);
  }

  private processTransactions() {
    const relacedAmount = replaceAmountFor(this.address)(this.transactionsArray);
    this.transactions = groupByDate(relacedAmount);
  }
}
