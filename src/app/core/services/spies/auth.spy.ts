import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '@app/core';

import { LTO, Account } from 'lto-api';
import { ILedgerAccount } from '../ledger.service';

const AuthServiceSpy: jasmine.SpyObj<AuthService> = jasmine.createSpyObj<AuthService>(
  'AuthService',
  [],
  {
    ltoInstance: {} as LTO,
    wallet$: of(null) as unknown as BehaviorSubject<Account | null>,
    ledgerAccount$: of(null) as unknown as BehaviorSubject<ILedgerAccount | null>,
  }
);

export function createAuthServiceSpy() {
  // if (accountType === 'wallet') {
  //   AuthServiceSpy.wallet$ = of({
  //     address: 'some-address',
  //     seed: 'some-seed',
  //     sign: 'some-sign',
  //     encrypt: 'some-encrypt',
  //   }) as unknown as BehaviorSubject<Account | null>;
  // }

  // if (accountType === 'ledger') {
  //   AuthServiceSpy.ledgerAccount$ = of({
  //     id: 'some-id',
  //     name: 'some-name',
  //     address: 'some-address',
  //     publicKey: 'some-key',
  //   }) as unknown as BehaviorSubject<ILedgerAccount | null>;
  // }

  return { provide: AuthService, useValue: AuthServiceSpy };
}
