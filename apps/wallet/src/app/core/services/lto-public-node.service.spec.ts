import { TestBed } from '@angular/core/testing';

import { LtoPublicNodeService } from './lto-public-node.service';

describe('LtoPublicNodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LtoPublicNodeService = TestBed.get(LtoPublicNodeService);
    expect(service).toBeTruthy();
  });
});
