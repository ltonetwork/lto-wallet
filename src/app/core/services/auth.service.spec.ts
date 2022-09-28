import { TestBed } from '@angular/core/testing';
import { LTO_MOBILE_AUTH, LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '../../tokens';

import { LedgerServiceMock } from './mocks';

import { AuthService } from './auth.service';

describe('core/AuthServiceImpl', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService.provider,
        LedgerServiceMock.provider,
        {
          provide: LTO_NETWORK_BYTE,
          useValue: 'T'
        },
        {
          provide: LTO_PUBLIC_API,
          useValue: 'http://localhost'
        },
        {
          provide: LTO_MOBILE_AUTH,
          useValue: {
            'ws': 'ws://localhost/connect',
            'url': 'http://localhost'
          }
        }
      ]
    });

    auth = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(auth).toBeTruthy();
  });
});
