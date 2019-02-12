import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  WalletService,
  IBalance,
  formControlErrors,
  ADDRESS_VALIDATOR,
  FeeService
} from '../../core';
import { DEFAULT_TRANSFER_FEE } from '../../tokens';
import { take, withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TransactionConfirmDialog } from '../../components/transaction-confirmation-dialog';

export interface LeaseData {
  amount: number;
  recipient: string;
  fee: number;
}

interface LeaseFormData {
  recipient: string;
  amount: number;
  fee: number;
}

@Component({
  selector: 'lto-wallet-start-lease-modal',
  templateUrl: './start-lease-modal.component.html',
  styleUrls: ['./start-lease-modal.component.scss']
})
export class StartLeaseModalComponent implements OnInit {
  leaseForm: FormGroup | null = null;
  balance$!: Observable<IBalance>;

  get recipientErrors() {
    return formControlErrors(this.leaseForm, 'recipient');
  }

  constructor(
    private dialogRef: MatDialogRef<any, LeaseData>,
    private _wallet: WalletService,
    private confirmDialog: TransactionConfirmDialog,
    @Inject(ADDRESS_VALIDATOR) private _addressValidator: ValidatorFn,
    @Inject(MAT_DIALOG_DATA) public balance: number,
    private _feeService: FeeService
  ) {}

  ngOnInit() {
    this.balance$ = this._wallet.balance$;

    this._wallet.balance$
      .pipe(
        withLatestFrom(this._feeService.leaseFee$),
        take(1)
      )
      .subscribe(([balance, leaseFee]) => {
        const maxAmount = balance.available / balance.amountDivider;
        const minAmount = 1 / balance.amountDivider;
        const fee = leaseFee / balance.amountDivider;

        this.leaseForm = new FormGroup({
          recipient: new FormControl('', [Validators.required, this._addressValidator]),
          amount: new FormControl(0, [
            Validators.required,
            Validators.min(minAmount),
            Validators.max(maxAmount)
          ]),
          fee: new FormControl({ value: fee, disabled: true }, [
            Validators.required,
            Validators.min(minAmount)
          ])
        });
      });
  }

  async lease() {
    if (!this.leaseForm) {
      return;
    }

    const formData = this.leaseForm.getRawValue() as LeaseFormData;

    const confirmed = await this._confirm(formData);

    if (!confirmed) {
      return;
    }

    this.dialogRef.close(formData);
  }

  private _confirm(formData: LeaseFormData) {
    return this.confirmDialog.show({
      title: 'Confirm lease',
      transactionData: [
        {
          label: 'To',
          value: formData.recipient
        },
        {
          label: 'Amount',
          value: formData.amount
        },
        {
          label: 'Fee',
          value: formData.fee
        }
      ]
    });
  }
}
