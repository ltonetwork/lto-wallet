import { TestBed } from '@angular/core/testing';
import { WalletService } from './wallet.service';
import { PublicNodeMock, AuthServiceMock, BridgeServiceMock } from './mocks';
import { AMOUNT_DIVIDER } from '../../tokens';

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
          useValue: 100000
        }
      ]
    });

    wallet = TestBed.get(WalletService);
  });

  it('should create', () => {
    expect(wallet).toBeTruthy();
  });
});
