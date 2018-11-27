import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lto-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.scss']
})
export class WithdrawModalComponent implements OnInit {
  withdrawForm: FormGroup;
  balance$: Observable<any> = of({});

  constructor(private snackbar: MatSnackBar, private dialog: MatDialogRef<any>) {
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

    // this.balance$ = wallet.balance$;
  }

  ngOnInit() {}

  async withdraw() {
    try {
      const { address, amount, fee } = this.withdrawForm.value;
      // await this.wallet.withdraw(address, amount, fee);
      this.snackbar.open('Withdraw successfull', 'Dismiss', { duration: 3000 });
      this.dialog.close();
    } catch (error) {
      this.snackbar.open('Something went wrong', 'Dismiss', { duration: 3000 });
    }
  }
}
