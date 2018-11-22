import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../core';
import { IAccountCredentials } from '../components/credentials-form/credentials-form.component';
import { MatHorizontalStepper } from '@angular/material';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper!: MatHorizontalStepper;

  seedCtrl: FormControl;

  private wallet: Account | null = null;

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {
    this.seedCtrl = new FormControl('', [Validators.required]);
  }

  ngOnInit() {}

  restoreWallet() {
    if (this.seedCtrl.invalid) {
      return;
    }

    try {
      this.wallet = this.auth.generateWallet(this.seedCtrl.value);
      this.stepper.next();
    } catch (error) {
      console.error(error);
      this.notify('Cannot import account');
    }
  }

  saveAccount(credentials: IAccountCredentials) {
    if (!this.wallet) {
      return;
    }

    try {
      const account = this.auth.saveAccount(
        credentials.accountName,
        credentials.password,
        this.wallet
      );
      this.auth.login(account, credentials.password);
      this.notify('Account successfully imported');
      this.router.navigate(['/']);
    } catch (error) {
      this.notify('Cannot import account');
      console.error(error);
    }
  }

  private notify(message: string) {
    this.snackbar.open(message, 'Dismiss', {
      duration: 3000
    });
  }
}
