import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
  leaseForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<any, LeaseData>,
    @Inject(MAT_DIALOG_DATA) public balance: number
  ) {
    this.leaseForm = new FormGroup({
      recipient: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      fee: new FormControl({ value: 0.001, disabled: true }, [Validators.required])
    });
  }

  ngOnInit() {}

  async lease() {
    if (this.leaseForm.invalid) {
      return;
    }

    const { amount, recipient, fee } = this.leaseForm.value;
    this.dialogRef.close({ amount, recipient, fee });
  }
}
