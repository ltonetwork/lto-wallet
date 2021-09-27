import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { WalletService, IBalance } from '../../core';

@Component({
  selector: 'lto-withdraw-modal',
  templateUrl: './withdraw-modal.component.html',
  styleUrls: ['./withdraw-modal.component.scss'],
})
export class WithdrawModalComponent implements OnInit {
  withdrawForm: FormGroup;
  balance$: Observable<IBalance>;

  constructor(private dialog: MatDialogRef<any>, private wallet: WalletService) {
    this.balance$ = wallet.balance$;

    this.withdrawForm = new FormGroup({
      address: new FormControl('', [Validators.required]),
      amount: new FormControl(0, [Validators.required]),
      fee: new FormControl(
        {
          value: 0.001,
          disabled: true,
        },
        []
      ),
    });
  }

  ngOnInit() {}

  async withdraw() {
    const { address, amount, fee } = this.withdrawForm.value;
    // await this.wallet.withdraw(address, amount, fee);
    this.dialog.close();
  }
}
