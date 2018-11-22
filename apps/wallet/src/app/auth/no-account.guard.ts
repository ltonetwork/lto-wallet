import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core';

/**
 * If you have account you should be redirected to login page
 */
@Injectable({
  providedIn: 'root'
})
export class NoAccountGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.availableAccounts.length) {
      this.router.navigate(['/', 'auth', 'signin']);
      return false;
    }
    return true;
  }
}
