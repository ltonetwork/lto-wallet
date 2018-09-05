import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Wallet } from '@wallet/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup;

  constructor(public wallet: Wallet) {
    this.sendForm = new FormGroup({
      recipient: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      attachment: new FormControl('', []),
      fee: new FormControl(0.001, [Validators.required])
    });
  }

  ngOnInit() {}

  async send(formValue: any) {
    const { amount, fee, attachment, recipient } = formValue;
    await this.wallet.transfer({ recipient, amount, fee, attachment });
  }
}
