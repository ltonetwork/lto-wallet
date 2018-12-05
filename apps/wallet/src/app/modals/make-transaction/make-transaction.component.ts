import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { WalletService, IBalance } from '../../core';

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup;

  balance$: Observable<IBalance>;

  constructor(public dialog: MatDialogRef<any>, private wallet: WalletService) {
    this.balance$ = wallet.balance$;

    this.sendForm = new FormGroup({
      recipient: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      attachment: new FormControl('', []),
      fee: new FormControl({ value: 0.001, disabled: true }, [Validators.required])
    });
  }

  ngOnInit() {}

  async send() {
    const { amount, fee, attachment, recipient } = this.sendForm.value;
    await this.wallet.transfer(this.sendForm.value);
    this.dialog.close();
  }
}
