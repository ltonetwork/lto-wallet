import { Component, OnInit, Input } from '@angular/core';

/**
 * Represents table for one transaction type
 */
@Component({
  selector: 'poe-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit {
  /**
   * Type of transactions to show.
   * LTO supporst limited set of transactions.
   * Detailsed information about transaction you can find:
   * https://docs.wavesplatform.com/en/technical-details/data-structures.html
   */
  @Input()
  transactionsType!: '4' | '8' | '9' | '12';

  @Input()
  transactions!: any[];

  get columns(): string[] | null {
    switch (this.transactionsType) {
      case '4':
      case '8':
        return ['id', 'fee', 'timestamp', 'sender', 'recipient', 'amount'];
      case '9':
        return ['id', 'fee', 'timestamp', 'sender', 'leasing'];
      case '12':
        return ['id', 'fee', 'timestamp', 'sender'];
    }

    return null;
  }

  constructor() {}

  ngOnInit() {
    const supportedTypes = ['4', '8', '9', '12'];
    const isSuported = supportedTypes.indexOf(this.transactionsType) !== -1;

    if (isSuported !== true) {
      console.warn(
        'Unsoported transaction type (' +
          this.transactionsType +
          ')! <poe-transactions-table> supports only ' +
          supportedTypes
      );
    }
  }
}
