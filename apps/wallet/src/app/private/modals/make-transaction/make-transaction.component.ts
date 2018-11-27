import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface TransferData {
  amount: number;
  fee: number;
  attachment: string;
  recipient: string;
}

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup;

  constructor(
    public dialog: MatDialogRef<any, TransferData>,
    @Inject(MAT_DIALOG_DATA) public balance: number
  ) {
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
    this.dialog.close({ amount, fee, attachment, recipient });
  }
}
