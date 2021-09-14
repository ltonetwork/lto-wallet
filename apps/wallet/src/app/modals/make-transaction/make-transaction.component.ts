import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import {
  WalletService,
  IBalance,
  FeeService,
} from '../../core';
import { take, withLatestFrom } from 'rxjs/operators';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';
import { MakeTransactionService } from '@wallet/core/services/make-transaction.service';

interface FormValue {
  transfers: FormTransfersValue[];
  attachment: string;
  fee: number;
}

interface FormTransfersValue {
  recipient: string;
  amount: number;
}

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss'],
})
export class MakeTransactionComponent implements OnInit {

  loading: boolean = false;
  
  sendForm: FormGroup | null = null;
  private _recipientsCountSubscription: Subscription;

  balance$!: Observable<IBalance>;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private wallet: WalletService,
    private snackbar: MatSnackBar,
    private transactionConfirmDialog: TransactionConfirmDialog,
    private _feeService: FeeService,
    private _transactionService: MakeTransactionService,
  ) {
    this._recipientsCountSubscription = this._transactionService.transfersCount$.subscribe(transfers => this.updateDialogSize(transfers));
  }

  ngOnInit() {
    this.balance$ = this.wallet.balance$;

    this.balance$
      .pipe(withLatestFrom(this._feeService.transferFee$, this._feeService.massTransferFee$), take(1))
      .subscribe(([balance, transferFee, massTransferFee]) => {
        this.sendForm = this._transactionService.initForm(balance, transferFee, massTransferFee);
      });
  }

  ngOnDestroy() {
    this._recipientsCountSubscription.unsubscribe();
  }

  async send() {
    if (!this.sendForm) {
      return;
    }
    const formValue = this.sendForm.getRawValue() as FormValue;
    const confirmed = await this._confirm(formValue);
    if (!confirmed) {
      return;
    }

    this.loading = true;

    try {
      if (formValue.transfers.length === 1) {
        // Send simple transaction
        await this.wallet.transfer({
          ...formValue.transfers[0],
          fee: formValue.fee,
          attachment: formValue.attachment,
        });
      } else {
        // Send mass transaction
        await this.wallet.massTransfer(formValue);
      }
    } catch (error) {
      this.snackbar.open('Transaction error', 'DISMISS', { duration: 3000 });
    }

    this.loading = false;
    this.dialogRef.close();
  }

  private async _confirm(formValue: FormValue) {
    let transactionData = [];

    if (formValue.transfers.length === 1) {
      // Simple transaction informations
      transactionData.push({
        label: 'To',
        value: formValue.transfers[0].recipient,
      },
      {
        label: 'Amount',
        value: formValue.transfers[0].amount,
      })
    } else {
      // Mass transaction informations
      transactionData.push({
        label: 'Number of recipients',
        value: formValue.transfers.length,
      });
      formValue.transfers.forEach(transfer => {
        transactionData.push({
          label: transfer.recipient,
          value: transfer.amount,
          detailOnly: true
        });
      })
      transactionData.push({
        label: 'Total amount',
        value: this._transactionService.totalAmount,
      })
    }

    // Shared informations
    transactionData.push({
      label: 'Fee',
      value: formValue.fee,
    },
    {
      label: 'Attachment',
      value: formValue.attachment,
    });

    return this.transactionConfirmDialog.show({transactionData});
  }

  private updateDialogSize (transfers: number) {
    if (transfers === 1)
      this.dialogRef.updateSize("500px");
    else if (transfers === 2)
      this.dialogRef.updateSize("700px");
  }
}
