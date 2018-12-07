import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-transaction-row',
  templateUrl: './transaction-row.component.html',
  styleUrls: ['./transaction-row.component.scss']
})
export class TransactionRowComponent implements OnInit {
  @Input() transaction!: any;
  @Input() myAddress!: string;

  get isOutcoming(): boolean {
    return this.transaction.sender === this.myAddress;
  }

  get isIncoming(): boolean {
    return !this.isOutcoming;
  }

  get isLease(): boolean {
    return false;
  }

  constructor() {}

  ngOnInit() {}

  _cancelLease() {}
}
