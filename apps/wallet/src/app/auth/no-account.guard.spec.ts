import { TestBed, async, inject } from '@angular/core/testing';

import { NoAccountGuard } from './no-account.guard';

describe('NoAccountGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoAccountGuard]
    });
  });

  it('should ...', inject([NoAccountGuard], (guard: NoAccountGuard) => {
    expect(guard).toBeTruthy();
  }));
});
