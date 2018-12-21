import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { WalletService, IBalance } from '../../core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lto-wallet-make-transaction',
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.scss']
})
export class MakeTransactionComponent implements OnInit {
  sendForm: FormGroup | null = null;

  balance$: Observable<IBalance>;

  constructor(
    public dialog: MatDialogRef<any>,
    private wallet: WalletService,
    private snackbar: MatSnackBar
  ) {
    this.balance$ = wallet.balance$;

    this.balance$.pipe(take(1)).subscribe(balance => {
      const maxValue = balance.available / balance.amountDivider;

      this.sendForm = new FormGroup({
        recipient: new FormControl('', [Validators.required]),
        amount: new FormControl(0, [
          Validators.required,
          Validators.min(0),
          Validators.max(maxValue)
        ]),
        attachment: new FormControl('', []),
        fee: new FormControl({ value: 0.001, disabled: true }, [Validators.required])
      });
    });
  }

  ngOnInit() {}

  async send() {
    if (!this.sendForm) {
      return;
    }
    try {
      await this.wallet.transfer(this.sendForm.value);
    } catch (error) {
      this.snackbar.open('Transacition error', 'DISMISS', { duration: 3000 });
    }
    this.dialog.close();
  }
}
