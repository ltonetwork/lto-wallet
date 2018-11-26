import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyWallet } from '../../core';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'lto-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.scss']
})
export class WithdrawModalComponent implements OnInit {
  withdrawForm: FormGroup;

  constructor(
    private wallet: MyWallet,
    private snackbar: MatSnackBar,
    private dialog: MatDialogRef<any>
  ) {
    this.withdrawForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required])
    });
  }

  ngOnInit() {}

  async withdraw() {
    try {
      const { address, amount } = this.withdrawForm.value;
      await this.wallet.withdraw(address, amount);
      this.snackbar.open('Withdraw successfull', 'Dismiss', { duration: 3000 });
      this.dialog.close();
    } catch (error) {
      this.snackbar.open('Something went wrong', 'Dismiss', { duration: 3000 });
    }
  }
}
