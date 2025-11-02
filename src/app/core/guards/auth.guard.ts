import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest(this.auth.authenticated$, this.auth.availableAccounts$).pipe(
      tap(([authenticated, accounts]) => {
        if (!authenticated) {
          const page = /*accounts.length ? 'signin' :*/ 'start';
          this.router.navigate(['/', page]);
        }
      }),
      map(([authenticated]) => authenticated)
    );
  }
}
