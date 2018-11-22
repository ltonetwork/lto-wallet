import { Component, OnInit } from '@angular/core';
import { AuthService, IUserAccount } from '../../core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  accounts: IUserAccount[];
  selected: IUserAccount;

  passwordForm: FormGroup;

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {
    this.accounts = auth.availableAccounts;
    this.selected = this.accounts[0];

    this.passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  select(account: IUserAccount) {
    this.selected = account;
  }

  inputKeydown(evt: KeyboardEvent) {
    if (evt.keyCode === 13) {
      this.signIn();
    }
  }

  signIn() {
    const { password } = this.passwordForm.value;
    if (!password) {
      return;
    }

    try {
      this.auth.login(this.selected, password);
      this.notify('You are logged in');
      this.router.navigate(['/']);
    } catch (error) {
      this.notify('Invalid password');
    }
  }

  private notify(message: string) {
    this.snackbar.open(message, 'Dismiss', { duration: 3000 });
  }
}
