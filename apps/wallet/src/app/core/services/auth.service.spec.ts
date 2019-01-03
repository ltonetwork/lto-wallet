import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { LTO_NETWORK_BYTE } from '../../tokens';

describe('core/AuthServiceImpl', () => {
  let auth: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService.provider,
        {
          provide: LTO_NETWORK_BYTE,
          useValue: 'T'
        }
      ]
    });

    auth = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(auth).toBeTruthy();
  });
});
