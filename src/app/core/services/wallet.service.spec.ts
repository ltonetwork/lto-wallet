import { TestBed } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { PublicNodeMock, LedgerServiceMock, AuthServiceMock, BridgeServiceMock } from './mocks';
import { AMOUNT_DIVIDER, DEFAULT_TRANSFER_FEE } from '../../tokens';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';
import { LedgerService } from './ledger.service';

describe('Core/WalletService', () => {
  let wallet: WalletService;
  let authService: any;
  let ledgerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WalletService.provider,
        PublicNodeMock.provider,
        AuthServiceMock.provider,
        BridgeServiceMock.provider,
        LedgerServiceMock.provider,
        {
          provide: AMOUNT_DIVIDER,
          useValue: 35000000,
        },
        {
          provide: DEFAULT_TRANSFER_FEE,
          useValue: 35000000,
        },
      ],
    });

    wallet = TestBed.inject(WalletService);
    authService = TestBed.inject(AuthService);
    ledgerService = TestBed.inject(LedgerService);
  });

  const timestamp = Date.now();

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(timestamp));
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('massTransfer()', () => {
    it('should process mass transfer transactions', async () => {
      const broadcastSpy = spyOn(authService.ltoInstance.API.PublicNode.transactions, 'broadcast');
      authService.wallet$ = new BehaviorSubject({
        address: 'some-address',
        getSignKeys: () => 'sign-keys',
      } as any);

      await wallet.massTransfer({
        fee: 10,
        attachment: undefined,
        transfers: [
          {
            amount: 20,
            recipient: 'some-recipient',
          },
        ],
      });

      expect(broadcastSpy).toHaveBeenCalledTimes(1);
      expect(broadcastSpy).toHaveBeenCalledWith(
        'massTransfer',
        {
          type: 11,
          version: 3,
          timestamp,
          fee: 350000000,
          transfers: [
            {
              recipient: 'some-recipient',
              amount: 700000000,
            },
          ],
        },
        'sign-keys'
      );
    });

    it('should use the ledger account if it is connected', async () => {
      const broadcastSpy = spyOn(ledgerService, 'signAndBroadcast');
      authService.ledgerAccount$ = new BehaviorSubject({ address: 'some-address' } as any);

      await wallet.massTransfer({
        fee: 10,
        attachment: undefined,
        transfers: [
          {
            amount: 20,
            recipient: 'some-recipient',
          },
        ],
      });

      expect(broadcastSpy).toHaveBeenCalledTimes(1);
      expect(broadcastSpy).toHaveBeenCalledWith({
        type: 11,
        version: 3,
        timestamp,
        fee: 350000000,
        transfers: [
          {
            recipient: 'some-recipient',
            amount: 700000000,
          },
        ],
      });
    });

    it('should round the amounts on the transaction correctly', async () => {
      const broadcastSpy = spyOn(authService.ltoInstance.API.PublicNode.transactions, 'broadcast');
      authService.wallet$ = new BehaviorSubject({
        address: 'some-address',
        getSignKeys: () => 'sign-keys',
      } as any);

      await wallet.massTransfer({
        fee: 10,
        attachment: undefined,
        transfers: [
          {
            amount: 20.123,
            recipient: 'some-recipient',
          },
        ],
      });

      expect(broadcastSpy).toHaveBeenCalledTimes(1);
      expect(broadcastSpy).toHaveBeenCalledWith(
        'massTransfer',
        {
          type: 11,
          version: 3,
          timestamp,
          fee: 350000000,
          transfers: [
            {
              recipient: 'some-recipient',
              amount: 704305000,
            },
          ],
        },
        'sign-keys'
      );
    });

    it('should fail if no account is connected', async () => {
      try {
        await wallet.massTransfer({
          fee: 10,
          attachment: undefined,
          transfers: [
            {
              amount: 20,
              recipient: 'some-recipient',
            },
          ],
        });
      } catch (error) {
        expect(error).toEqual(new Error('No account connected'));
      }
    });
  });
});
