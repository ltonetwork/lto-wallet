import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TransactionTypes } from '../../../../core';

@Component({
  selector: 'lto-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent implements OnInit {
  @Input() transaction!: any;
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

  constructor() {}

  ngOnInit() {}

  _cancelLease(event: Event) {
    event.stopPropagation();
    this.cancelLease.next();
  }
}
