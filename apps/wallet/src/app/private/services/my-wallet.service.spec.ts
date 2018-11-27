import { TestBed } from '@angular/core/testing';

import { MyWallet } from './my-wallet.service';

describe('MyWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyWallet = TestBed.get(MyWallet);
    expect(service).toBeTruthy();
  });
});
