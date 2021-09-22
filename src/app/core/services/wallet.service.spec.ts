import { TestBed } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { PublicNodeMock, LedgerServiceMock, AuthServiceMock, BridgeServiceMock } from './mocks';
import { AMOUNT_DIVIDER, DEFAULT_TRANSFER_FEE } from '../../tokens';

describe('Core/WalletService', () => {
  let wallet: WalletService;

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

  it('should create', () => {
    expect(wallet).toBeTruthy();
  });
});
