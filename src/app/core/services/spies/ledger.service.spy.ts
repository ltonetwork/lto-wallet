import { BehaviorSubject, of } from 'rxjs';
import { LedgerService } from '@app/core';
import { ILedgerAccount } from '../ledger.service';

const LedgerServiceSpy: jasmine.SpyObj<LedgerService> = jasmine.createSpyObj<LedgerService>(
  'LedgerService',
  ['connect', 'disconnect', 'updateUserData', 'signAndBroadcast'],
  {
    ledgerId: 0,
    connected$: of(false) as BehaviorSubject<boolean>,
    ledgerAccount$: of(null) as BehaviorSubject<ILedgerAccount | null>,
  }
);

LedgerServiceSpy.connect.and.resolveTo();
LedgerServiceSpy.disconnect.and.resolveTo();
LedgerServiceSpy.updateUserData.and.resolveTo();
LedgerServiceSpy.signAndBroadcast.and.resolveTo();

export function createLedgerServiceSpy() {
  return { provide: LedgerService, useValue: LedgerServiceSpy };
}
