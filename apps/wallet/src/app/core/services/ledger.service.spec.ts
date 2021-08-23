import { TestBed } from '@angular/core/testing';

import { LedgerService } from './ledger.service';

describe('Core/LedgerService', () => {
  let ledger: LedgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LedgerService]
    });

    ledger = TestBed.get(LedgerService);
  });

  it('should create', () => {
    expect(ledger).toBeTruthy();
  });
});
