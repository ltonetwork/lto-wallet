import { TestBed, inject } from '@angular/core/testing';
import { LTO_NETWORK_BYTE } from '../tokens';

import { AccountManagementService } from './account-management.service';

describe('AccountManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountManagementService,
        {
          provide: LTO_NETWORK_BYTE,
          useValue: 'T'
        }
      ]
    });
  });

  it('should be created', inject(
    [AccountManagementService],
    (service: AccountManagementService) => {
      expect(service).toBeTruthy();
    }
  ));
});
