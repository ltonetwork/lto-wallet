import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountManagementService } from './account-management.service';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let accountManagerMock: Partial<AccountManagementService>;

  beforeEach(() => {
    accountManagerMock = {};

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AccountManagementService,
          useValue: accountManagerMock
        }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
