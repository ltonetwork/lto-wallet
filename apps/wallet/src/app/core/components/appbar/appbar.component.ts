import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, IUserAccount } from '../../services';

@Component({
  selector: 'lto-appbar',
  templateUrl: './appbar.component.html',
  styleUrls: ['./appbar.component.scss']
})
export class AppbarComponent implements OnInit {
  authenticated$: Observable<boolean>;
  userAccount$: Observable<IUserAccount | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.authenticated$ = auth.authenticated$;
    this.userAccount$ = auth.account$;
  }

  ngOnInit() {}

  signout() {
    this.auth.logout();
    this.router.navigate(['/', 'signin']);
  }
}
