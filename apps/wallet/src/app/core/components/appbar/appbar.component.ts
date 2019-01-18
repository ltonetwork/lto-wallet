import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService, IUserAccount, Sidenav } from '../../services';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  authenticated$: Observable<boolean>;
  userAccount$: Observable<IUserAccount | null>;

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _sidenav: Sidenav,
    private _snackbar: MatSnackBar
  ) {
    this.authenticated$ = _auth.authenticated$;
    this.userAccount$ = _auth.account$;
  }

  ngOnInit() {}

  signout() {
    this._auth.logout();
    this._router.navigate(['/', 'signin']);
  }

  openSidenav() {
    this._sidenav.open();
  }

  copyAddressToClipboard(address: string) {
    const input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.bottom = '-1000px';
    document.body.appendChild(input);
    input.value = address;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    this._snackbar.open('Address is copied', 'Dismiss', { duration: 3000 });
  }
}
