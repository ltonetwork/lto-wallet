import { TestBed, inject } from '@angular/core/testing';

import { LtoPublicNodeService } from './lto-public-node.service';

describe('LtoPublicNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LtoPublicNodeService]
    });
  });

  it('should be created', inject([LtoPublicNodeService], (service: LtoPublicNodeService) => {
    expect(service).toBeTruthy();
  }));
});
