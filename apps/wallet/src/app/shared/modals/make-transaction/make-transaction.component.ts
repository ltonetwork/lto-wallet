import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup;

  constructor() {
    this.sendForm = new FormGroup({
      recipient: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      attachment: new FormControl('', []),
      fee: new FormControl(0.001, [Validators.required])
    });
  }

  ngOnInit() {}

  send() {}
}
