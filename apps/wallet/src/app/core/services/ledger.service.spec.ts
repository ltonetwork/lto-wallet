import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { LedgerService } from './ledger.service';
import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@wallet/tokens';

describe('Core/LedgerService', () => {
  let ledger: LedgerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
      ],
      providers: [
        LedgerService.provider,
        { provide: LTO_NETWORK_BYTE, useValue: 'T' },
        { provide: LTO_PUBLIC_API, useValue: 'http://localhost' }
      ]
    });

    ledger = TestBed.get(LedgerService);
  });

  it('should create', () => {
    expect(ledger).toBeTruthy();
  });
});
