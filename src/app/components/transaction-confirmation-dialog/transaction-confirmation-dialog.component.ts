import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface TransactionConfirmDialogData {
  title?: string;
  transactionData: TransactionDataField[];
}

interface TransactionDataField {
  label: string;
  value: string | number;
  /**
   * Field to only be shown in the detail view
   */
  detailOnly?: boolean;
}

@Component({
    selector: 'lto-wallet-transaction-confirmation-dialog',
    templateUrl: './transaction-confirmation-dialog.component.html',
    styleUrls: ['./transaction-confirmation-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DecimalPipe],
    standalone: false
})
export class TransactionConfirmationDialogComponent implements OnInit {
  dialogTitle!: string;
  transactionData!: TransactionDataField[];
  showDetails = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _dialogData: TransactionConfirmDialogData,
    private _decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.dialogTitle = this._dialogData.title || 'Confirm transaction';
    this.transactionData = this._dialogData.transactionData || [];
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  prettify(value: string | number) {
    if (typeof value === 'number') {
      return this._decimalPipe.transform(value);
    }

    return value;
  }

  /**
   * Return true if there is fields to show only in the detail view
   */
  get haveDetails () { return this.transactionData.some(field => field.detailOnly); }
}
