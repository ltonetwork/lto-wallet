import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { WAVES_API } from './tokens';
import { WavesNodeService } from './waves-node.service';

describe('WavesNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WavesNodeService, { provide: WAVES_API, useValue: 'http://wavestesturl.test/' }]
    });
  });

  it('should be created', inject([WavesNodeService], (service: WavesNodeService) => {
    expect(service).toBeTruthy();
  }));
});
