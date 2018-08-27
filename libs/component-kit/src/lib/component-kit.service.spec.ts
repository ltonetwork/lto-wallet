import { TestBed, inject } from '@angular/core/testing';

import { ComponentKitService } from './component-kit.service';

describe('ComponentKitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComponentKitService]
    });
  });

  it('should be created', inject([ComponentKitService], (service: ComponentKitService) => {
    expect(service).toBeTruthy();
  }));
});
