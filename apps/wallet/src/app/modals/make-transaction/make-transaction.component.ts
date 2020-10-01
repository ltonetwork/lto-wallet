import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import {
  WalletService,
  IBalance,
  formControlErrors,
  ADDRESS_VALIDATOR,
  FeeService,
} from '../../core';
import { take, withLatestFrom } from 'rxjs/operators';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';
import { DEFAULT_TRANSFER_FEE } from '../../tokens';

interface FormValue {
  recipient: string;
  amount: number;
  attachment: string;
  fee: number;
}

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss'],
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup | null = null;

  get recipientErrors() {
    const errors = formControlErrors(this.sendForm, 'recipient');
    return errors;
  }

  balance$!: Observable<IBalance>;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private wallet: WalletService,
    private snackbar: MatSnackBar,
    private transactionConfirmDialog: TransactionConfirmDialog,
    private _feeService: FeeService,
    @Inject(ADDRESS_VALIDATOR) private _addressValidator: ValidatorFn
  ) {}

  ngOnInit() {
    this.balance$ = this.wallet.balance$;

    this.balance$
      .pipe(withLatestFrom(this._feeService.transferFee$), take(1))
      .subscribe(([balance, transferFee]) => {
        const maxTransactionValue = balance.available / balance.amountDivider;
        const minTransactionValue = 1 / balance.amountDivider;
        const fee = transferFee / balance.amountDivider;
        this.sendForm = new FormGroup({
          recipient: new FormControl('', [Validators.required, this._addressValidator]),
          amount: new FormControl(0, [
            Validators.required,
            Validators.min(minTransactionValue),
            Validators.max(maxTransactionValue),
          ]),
          attachment: new FormControl('', []),
          fee: new FormControl({ value: fee, disabled: true }, [
            Validators.required,
            Validators.min(minTransactionValue),
          ]),
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
      await this.wallet.transfer(formValue);
    } catch (error) {
      this.snackbar.open('Transaction error', 'DISMISS', { duration: 3000 });
    }
    this.dialogRef.close();
  }

  private async _confirm(formValue: FormValue) {
    return this.transactionConfirmDialog.show({
      transactionData: [
        {
          label: 'To',
          value: formValue.recipient,
        },
        {
          label: 'Amount',
          value: formValue.amount,
        },
        {
          label: 'Fee',
          value: formValue.fee,
        },
        {
          label: 'Attachment',
          value: formValue.attachment,
        },
      ],
    });
  }
}
