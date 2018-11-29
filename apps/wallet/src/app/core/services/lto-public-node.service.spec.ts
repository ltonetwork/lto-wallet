import { TestBed } from '@angular/core/testing';

import { LtoPublicNodeService } from './lto-public-node.service';

describe('LtoPublicNodeService', () => {
  let service: LtoPublicNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LtoPublicNodeService.provider]
    });

    service = TestBed.get(LtoPublicNodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
