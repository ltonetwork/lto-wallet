import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../core';
import { Account } from 'lto-api';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {
  @ViewChild('step1Tpl') step1!: TemplateRef<any>;
  @ViewChild('step2Tpl') step2!: TemplateRef<any>;

  stepTemplate!: TemplateRef<any>;
  wallet!: Account;

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {}

  ngOnInit() {
    this.stepTemplate = this.step1;
  }

  restoreWallet(seed: string) {
    try {
      this.wallet = this.auth.generateWallet(seed);
      this.stepTemplate = this.step2;
    } catch (error) {
      console.error(error);
      this.notify('Cannot import account');
    }
  }

  saveAccount(credentials: { accountName: string; password: string }) {
    try {
      const account = this.auth.saveAccount(
        credentials.accountName,
        credentials.password,
        this.wallet
      );
      this.auth.login(account, credentials.password);
      this.router.navigate(['/']);
    } catch (err) {
      console.log(err);
    }
  }

  private notify(message: string) {
    this.snackbar.open(message, 'Dismiss', {
      duration: 3000
    });
  }
}
