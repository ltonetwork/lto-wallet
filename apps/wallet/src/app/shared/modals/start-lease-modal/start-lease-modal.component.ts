import { Component, OnInit } from '@angular/core';
import { Wallet } from '../../../core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lto-wallet-start-lease-modal',
  templateUrl: './start-lease-modal.component.html',
  styleUrls: ['./start-lease-modal.component.scss']
})
export class StartLeaseModalComponent implements OnInit {
  leaseForm: FormGroup;

  constructor(public wallet: Wallet) {
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
    await this.wallet.lease(recipient, amount, fee);
  }
}
