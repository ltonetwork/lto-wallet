import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { WalletService, IBalance, toPromise } from '../../core';
import { take } from 'rxjs/operators';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';

interface FormValue {
  recipient: string;
  amount: number;
  attachment: string;
  fee: number;
}

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup | null = null;

  balance$!: Observable<IBalance>;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private wallet: WalletService,
    private snackbar: MatSnackBar,
    private transactionConfirmDialog: TransactionConfirmDialog
  ) {}

  ngOnInit() {
    this.balance$ = this.wallet.balance$;

    this.balance$.pipe(take(1)).subscribe(balance => {
      const maxValue = balance.available / balance.amountDivider;

      this.sendForm = new FormGroup({
        recipient: new FormControl('', [Validators.required]),
        amount: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(maxValue)
        ]),
        attachment: new FormControl('', []),
        fee: new FormControl({ value: 0.001, disabled: true }, [Validators.required])
      });
    });
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

    try {
      await this.wallet.transfer(this.sendForm.value);
    } catch (error) {
      this.snackbar.open('Transacition error', 'DISMISS', { duration: 3000 });
    }
    this.dialogRef.close();
  }

  private async _confirm(formValue: FormValue) {
    return this.transactionConfirmDialog.show({
      transactionData: [
        {
          label: 'To',
          value: formValue.recipient
        },
        {
          label: 'Amount',
          value: formValue.amount.toString()
        },
        {
          label: 'Fee',
          value: formValue.fee.toString()
        },
        {
          label: 'Attachment',
          value: formValue.attachment
        }
      ]
    });
  }
}
