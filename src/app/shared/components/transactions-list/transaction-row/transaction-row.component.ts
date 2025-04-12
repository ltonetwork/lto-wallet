import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TransactionTypes } from '../../../../core';

@Component({
    selector: 'lto-transaction-row',
    templateUrl: './transaction-row.component.html',
    styleUrls: ['./transaction-row.component.scss'],
    standalone: false
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

  get cancelButtonDisabled(): boolean {
    return this.transaction.isCanceling || this._cancelClickedOn === this.transaction.id;
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

  /**
   * When we click "cancel" button we need to disable it immediatelly
   * So we just store id of transaction we want to cancel
   */
  private _cancelClickedOn: string = '';

  constructor() {}

  ngOnInit() {}

  _cancelLease(event: Event) {
    this._cancelClickedOn = this.transaction.id;
    event.stopPropagation();
    this.cancelLease.next();
  }
}
