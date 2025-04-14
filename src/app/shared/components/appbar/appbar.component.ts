import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService, ILedgerAccount, IUserAccount, Sidenav } from '@app/core/services';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { BrandModule } from '@app/shared/components/brand';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSnackBarModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    BrandModule,
  ],
})
export class AppbarComponent implements OnInit, OnDestroy {
  authenticated$!: Subscription;
  authenticated?: boolean;

  user$!: Subscription;
  userAccount!: IUserAccount | null;

  ledger$!: Subscription;
  ledgerAccount!: ILedgerAccount | null;

  accounts$!: Subscription;
  availableAccounts!: any;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _sidenav: Sidenav,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.user$ = this._auth.account$.subscribe((userAccount) => (this.userAccount = userAccount));
    this.ledger$ = this._auth.ledgerAccount$.subscribe(
      (ledgerAccount) => (this.ledgerAccount = ledgerAccount)
    );
    this.authenticated$ = this._auth.authenticated$.subscribe(
      (authenticated) => (this.authenticated = authenticated)
    );
    this.accounts$ = this._auth.availableAccounts$.subscribe(
      (availableAccounts) => (this.availableAccounts = availableAccounts)
    );
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
    this.ledger$.unsubscribe();
    this.accounts$.unsubscribe();
    this.authenticated$.unsubscribe();
  }

  signout() {
    this._auth.logout();
    this._router.navigate(['/', 'signin']);
  }

  openSidenav() {
    this._sidenav.open();
  }

  copyAddressToClipboard(address: string) {
    navigator.clipboard.writeText(address).then(() => {
      this._snackbar.open('Address is copied', 'Dismiss', { duration: 3000 });
    }).catch(() => {
      this._snackbar.open('Failed to copy address', 'Dismiss', { duration: 3000 });
    });
  }
}
