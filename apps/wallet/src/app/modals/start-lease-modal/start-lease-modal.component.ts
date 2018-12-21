import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WalletService, IBalance } from '../../core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface LeaseData {
  amount: number;
  recipient: string;
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
    private wallet: WalletService,
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

    const { amount, recipient, fee } = this.leaseForm.value;
    this.dialogRef.close({ amount, recipient, fee });
  }
}
