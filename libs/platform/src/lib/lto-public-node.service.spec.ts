import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LTO_PUBLIC_API } from './tokens';

import { LtoPublicNodeService } from './lto-public-node.service';

describe('LtoPublicNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LtoPublicNodeService,
        { provide: LTO_PUBLIC_API, useValue: 'http://testltonode.test/' }
      ]
    });
  });

  it('should be created', inject([LtoPublicNodeService], (service: LtoPublicNodeService) => {
    expect(service).toBeTruthy();
  }));
});
