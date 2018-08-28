import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBar } from '@angular/material';

describe('NotificationService', () => {
  let matSnackbarMock: Partial<MatSnackBar>;

  beforeEach(() => {
    matSnackbarMock = {};

    TestBed.configureTestingModule({
      providers: [NotificationService, { provide: MatSnackBar, useValue: matSnackbarMock }]
    });
  });

  it('should be created', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
  }));
});
