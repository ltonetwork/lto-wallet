import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { CanActivate, Router } from '@angular/router';

import { AuthService, LedgerService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private ledger: LedgerService,
  ) {}

  canActivate(): Observable<boolean> {
    return combineLatest(this.auth.authenticated$, this.auth.availableAccounts$, this.ledger.connected$).pipe(
      tap(([authenticated, accounts, ledgerConnected]) => {
        if (ledgerConnected) return;

        if (!authenticated) {
          const page = accounts.length ? 'signin' : 'start';
          this.router.navigate(['/', page]);
        }
      }),
      map(([authenticated, accounts, ledgerConnected]) => authenticated || ledgerConnected)
    );
  }
}
