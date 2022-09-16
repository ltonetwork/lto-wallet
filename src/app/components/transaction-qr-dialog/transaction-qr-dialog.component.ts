import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletService } from '@app/core';

export interface TransactionQrDialogData {
  title?: string;
  tx: object;
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
  selector: 'lto-wallet-transaction-qr-dialog',
  templateUrl: './transaction-qr-dialog.component.html',
  styleUrls: ['./transaction-qr-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DecimalPipe],
})
export class TransactionQrDialogComponent implements OnInit {
  dialogTitle!: string;
  tx!: object;
  transactionData!: TransactionDataField[];
  showDetails = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private _dialogData: TransactionQrDialogData,
    private _decimalPipe: DecimalPipe
  ) {}

  ngOnInit() {
    this.dialogTitle = this._dialogData.title || 'Scan the QR code with LTO Universal wallet';
    this.tx = this._dialogData.tx;
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
