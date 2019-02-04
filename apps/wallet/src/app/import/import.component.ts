import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../core';
import { Account } from 'lto-api';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take, shareReplay } from 'rxjs/operators';

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

  seedControl = new FormControl('');

  walletAddress$: Observable<string>;
  account$: Observable<Account | null>;

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {
    this.account$ = this.seedControl.valueChanges.pipe(
      map((seed: string) => {
        try {
          return this.auth.generateWallet(seed.trim());
        } catch (err) {
          return null;
        }
      }),
      shareReplay(1)
    );

    this.walletAddress$ = this.account$.pipe(
      map(account => {
        return account ? account.address : '';
      })
    );
  }

  ngOnInit() {
    this.stepTemplate = this.step1;
  }

  gotoStep2() {
    this.account$.pipe(take(1)).subscribe(account => {
      if (account) {
        this.wallet = account;
        this.stepTemplate = this.step2;
      }
    });
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
