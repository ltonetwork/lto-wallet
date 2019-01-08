import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, IUserAccount, Sidenav } from '../../services';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  authenticated$: Observable<boolean>;
  userAccount$: Observable<IUserAccount | null>;

  constructor(private _auth: AuthService, private _router: Router, private _sidenav: Sidenav) {
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
}
