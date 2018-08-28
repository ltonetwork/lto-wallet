import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * Represents wallet
 */
@Injectable({ providedIn: 'root' })
export class Wallet {
  balance$: Observable<number>;

  constructor() {
    this.balance$ = of(0);
  }
}
