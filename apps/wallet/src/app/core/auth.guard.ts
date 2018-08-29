import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountManagementService } from './account-management.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _accountManagement: AccountManagementService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this._accountManagement.account$.pipe(
      take(1),
      map(account => {
        const authenticated = !!account;
        if (!authenticated) {
          this._router.navigate(['/', 'auth', 'login']);
        }

        return authenticated;
      })
    );
  }
}
