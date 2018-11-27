import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface WithdrawData {
  address: string;
  amount: number;
  fee: number;
}

@Component({
  selector: 'lto-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.scss']
})
export class WithdrawModalComponent implements OnInit {
  withdrawForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public balance: number,
    private dialog: MatDialogRef<any, WithdrawData>
  ) {
    this.withdrawForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      fee: new FormControl(
        {
          value: 0.001,
          disabled: true
        },
        []
      )
    });
  }

  ngOnInit() {}

  async withdraw() {
    const { address, amount, fee } = this.withdrawForm.value;
    this.dialog.close({ address, amount, fee });
  }
}
