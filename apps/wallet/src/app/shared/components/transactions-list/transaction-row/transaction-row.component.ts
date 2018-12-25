import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TransactionTypes } from '../../../../core';

@Component({
  selector: 'lto-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent implements OnInit {
  @Input() transaction!: LTO.Transaction;
  @Input() myAddress!: string;
  @Output() cancelLease = new EventEmitter();

  get isOutcoming(): boolean {
    return this.transaction.sender === this.myAddress;
  }

  get isIncoming(): boolean {
    return !this.isOutcoming;
  }

  get isLease(): boolean {
    return this.transaction.type === TransactionTypes.LEASING;
  }

  get showCancelLease(): boolean {
    return (
      this.isLease &&
      this.transaction.status === 'active' &&
      this.transaction.sender === this.myAddress
    );
  }

  get transactionIcon(): string {
    if (this.transaction.unconfirmed) {
      return 'hourglass_empty';
    } else if (this.isIncoming) {
      return 'arrow_downward';
    } else if (this.isOutcoming) {
      return 'arrow_upward';
    }

    return '';
  }

  constructor() {}

  ngOnInit() {}

  _cancelLease(event: Event) {
    event.stopPropagation();
    this.cancelLease.next();
  }
}
