import { TestBed } from '@angular/core/testing';

import { MyWalletService } from './my-wallet.service';

describe('MyWalletService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyWalletService = TestBed.get(MyWalletService);
    expect(service).toBeTruthy();
  });
});
