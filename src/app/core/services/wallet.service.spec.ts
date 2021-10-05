import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';

import { AMOUNT_DIVIDER, DEFAULT_TRANSFER_FEE } from '../../tokens';

import { createAuthServiceSpy, createBridgeServiceSpy, createLedgerServiceSpy, createPublicNodeServiceSpy } from './spies';
import { AuthService } from './auth.service';

fdescribe('Core/WalletService', () => {
  let wallet: WalletService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WalletService.provider,
        createAuthServiceSpy(),
        createPublicNodeServiceSpy(),
        createBridgeServiceSpy(),
        createLedgerServiceSpy(),
        {
          provide: AMOUNT_DIVIDER,
          useValue: 35000000
        },
        {
          provide: DEFAULT_TRANSFER_FEE,
          useValue: 35000000
        }
      ]
    });

    wallet = TestBed.get(WalletService);
  });

  describe('massTransfer()', () => {
    it('should process mass transfer transactions', async () => {
      // @todo: fix the "No account connected" error on the spy
      await wallet.massTransfer({
        fee: 10,
        attachment: undefined,
        transfers: [{
          amount: 20,
          recipient: 'some-recipient'
        }]
      });
    });

    // it('should use the ledger account if it is connected', async () => {});

    // it('should round the amounts on the transaction correctly', async () => {});

    it('should fail if no account is connected', async () => {
      try {
        await wallet.massTransfer({
          fee: 10,
          attachment: undefined,
          transfers: [{
            amount: 20,
            recipient: 'some-recipient'
          }]
        });
      } catch (error) {
        expect(error).toEqual(new Error('No account connected'));
      }
    });
  });
});
