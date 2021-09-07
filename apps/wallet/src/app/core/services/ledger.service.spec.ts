import { TestBed } from '@angular/core/testing';
import { WavesLedger } from 'lto-ledger-js-unofficial-test';

import { LedgerService } from './ledger.service';

describe('Core/LedgerService', () => {
  let ledger: LedgerService;

  // @todo: mock waves class?
  class MockWaves extends WavesLedger { }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LedgerService,
        { provide: WavesLedger, useClass: MockWaves }
      ]
    }).compileComponents();

    ledger = TestBed.get(LedgerService);
  });

  // @todo: make tests
  it('should connect to ledger and wait until device ready', async () => {});

  it('should disconnect from ledger', async () => {});

  it('should not disconnect if ledger is not connected', async () => {});

  describe('sign transaction', () => {
    it('should sign and broadcast a transaction', async () => {});

    it('should throw if ledger not connected', async () => {});

    it('should throw if no user data from ledger', async () => {});

    it('should throw if transaction type is unknown', async () => {});
  });
});
