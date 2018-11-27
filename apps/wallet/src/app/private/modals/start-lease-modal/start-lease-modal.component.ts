import { Component, OnInit } from '@angular/core';
// import { MyWallet } from '../../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'lto-wallet-start-lease-modal',
  templateUrl: './start-lease-modal.component.html',
  styleUrls: ['./start-lease-modal.component.scss']
})
export class StartLeaseModalComponent implements OnInit {
  leaseForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<any>) {
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
    try {
      // await this.wallet.lease(recipient, amount, fee);
      this.dialogRef.close(true);
    } catch (err) {
      console.error(err);
    }
  }
}
