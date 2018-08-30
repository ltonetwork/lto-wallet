import { Component } from '@angular/core';
import { AccountManagementService } from '@wallet/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'lto-api';

@Component({
  selector: 'lto-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent {
  wallet: Account;

  createForm: FormGroup;

  constructor(private _accountManagement: AccountManagementService, private _router: Router) {
    this.wallet = _accountManagement.generateWallet();

    this.createForm = new FormGroup({
      address: new FormControl({
        value: this.wallet.address,
        disabled: true
      }),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async createAccount() {
    const { name, password } = this.createForm.value;
    await this._accountManagement.createAccount(name, password, this.wallet);
    this._router.navigate(['/']);
  }
}
