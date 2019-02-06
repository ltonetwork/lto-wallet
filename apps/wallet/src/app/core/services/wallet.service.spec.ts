import { TestBed } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { PublicNodeMock, AuthServiceMock, BridgeServiceMock } from './mocks';
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
        {
          provide: AMOUNT_DIVIDER,
          useValue: 25000000
        },
        {
          provide: DEFAULT_TRANSFER_FEE,
          useValue: 25000000
        }
      ]
    });

    wallet = TestBed.get(WalletService);
  });

  it('should create', () => {
    expect(wallet).toBeTruthy();
  });
});
