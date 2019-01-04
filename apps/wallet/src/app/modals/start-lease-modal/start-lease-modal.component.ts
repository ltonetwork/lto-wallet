import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { WalletService, IBalance, toPromise } from '../../core';
import { take } from 'rxjs/operators';
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
  balance$: Observable<IBalance>;

  constructor(
    private dialogRef: MatDialogRef<any, LeaseData>,
    wallet: WalletService,
    private confirmDialog: TransactionConfirmDialog,
    @Inject(MAT_DIALOG_DATA) public balance: number
  ) {
    this.balance$ = wallet.balance$;

    wallet.balance$.pipe(take(1)).subscribe(balance => {
      const max = balance.available / balance.amountDivider;
      this.leaseForm = new FormGroup({
        recipient: new FormControl('', [Validators.required]),
        amount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(max)]),
        fee: new FormControl({ value: 0.001, disabled: true }, [Validators.required])
      });
    });
  }

  ngOnInit() {}

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
          value: formData.amount.toString()
        },
        {
          label: 'Fee',
          value: formData.fee.toString()
        }
      ]
    });
  }
}
