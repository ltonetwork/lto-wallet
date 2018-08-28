import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  accounts$: Observable<any[]>;

  constructor() {
    this.accounts$ = of([]);
  }

  login(address: string, password: string) {}

  createAccount(address: string, name: string, password: string) {}
}
