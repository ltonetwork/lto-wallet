import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { groupByDate, TransactionsGroup, replaceAmountFor, TransactionTypes } from '../../../core';

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
  @Output() cancelLease = new EventEmitter();

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

  isLease(transaction: any) {
    return transaction.type === TransactionTypes.LEASING;
  }

  _transactionClick(transaction: any) {
    this.transactionClick.next(transaction);
  }

  _cancelLease(transaction: any, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cancelLease.next(transaction);
  }

  private processTransactions() {
    const relacedAmount = replaceAmountFor(this.address)(this.transactionsArray);
    this.transactions = groupByDate(relacedAmount);
  }
}
