import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { take, tap, map } from 'rxjs/operators';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return combineLatest(this.auth.authenticated$, this.auth.availableAccounts$).pipe(
      tap(([authenticated, accounts]) => {
        if (!authenticated) {
          const page = accounts.length ? 'signin' : 'start';
          this.router.navigate(['/', page]);
        }
      }),
      map(([authenticated]) => authenticated)
    );
  }
}
