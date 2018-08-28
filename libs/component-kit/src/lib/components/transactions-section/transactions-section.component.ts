import { Component, OnInit, Input, OnChanges } from '@angular/core';

/**
 * Represents section with transactions tables inside
 */
@Component({
  selector: 'lto-transactions-section',
  templateUrl: './transactions-section.component.html',
  styleUrls: ['./transactions-section.component.scss']
})
export class TransactionsSectionComponent implements OnInit, OnChanges {
  @Input()
  transactions!: any[];

  groupedTransactions!: { [transactionType: string]: any[] };

  constructor() {}

  ngOnInit() {
    this._groupTransactions();
  }

  ngOnChanges() {
    this._groupTransactions();
  }

  transactionLabel(type: string): string {
    switch (type) {
      case '4':
        return 'Transfer';
      case '8':
        return 'Lease';
      case '9':
        return 'Lease cancel';
      case '12':
        return 'Data';
    }

    return '';
  }

  private _groupTransactions() {
    this.groupedTransactions = this.transactions.reduce(
      (group, transaction) => {
        const transactionsOfType = group[transaction.type] || [];
        transactionsOfType.push(transaction);
        return {
          ...group,
          [transaction.type]: transactionsOfType
        };
      },
      {} as any
    );
  }
}
