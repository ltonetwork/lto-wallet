import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface TransactionConfirmDialogData {
  title?: string;
  transactionData: TransactionDataField[];
}

interface TransactionDataField {
  label: string;
  value: string;
}

@Component({
  selector: 'lto-wallet-transaction-confirmation-dialog',
  templateUrl: './transaction-confirmation-dialog.component.html',
  styleUrls: ['./transaction-confirmation-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionConfirmationDialogComponent implements OnInit {
  dialogTitle!: string;
  transactionData!: TransactionDataField[];

  constructor(@Inject(MAT_DIALOG_DATA) private _dialogData: TransactionConfirmDialogData) {}

  ngOnInit() {
    this.dialogTitle = this._dialogData.title || 'Confirm transaction';
    this.transactionData = this._dialogData.transactionData || [];
  }
}
