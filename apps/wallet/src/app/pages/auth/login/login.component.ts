import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AccountManagementService, IUserAccount } from '@wallet/core';

@Component({
  selector: 'lto-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  accounts$: Observable<IUserAccount[]>;

  loginForm: FormGroup;

  constructor(private _accountManagement: AccountManagementService, private _router: Router) {
    this.accounts$ = _accountManagement.awailableAccounts$;

    this.loginForm = new FormGroup({
      account: new FormControl(null, [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      return;
    }

    try {
      const { account, password } = this.loginForm.value;
      const address = await this._accountManagement.login(account, password);
      this._router.navigate(['/', address]);
    } catch (error) {
      this.loginForm.controls['password'].setErrors({
        wrong: true
      });
    }
  }
}
