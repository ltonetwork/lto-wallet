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
}

@Component({
  selector: 'lto-wallet-transaction-confirmation-dialog',
  templateUrl: './transaction-confirmation-dialog.component.html',
  styleUrls: ['./transaction-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export class TransactionConfirmationDialogComponent implements OnInit {
  dialogTitle!: string;
  transactionData!: TransactionDataField[];

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
}
