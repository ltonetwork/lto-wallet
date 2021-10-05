import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LTO_PUBLIC_API } from '../../tokens';
import { PublicNodeService } from './public-node.service';

describe('Core/PublicNodeService', () => {
  let publicNode: PublicNodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PublicNodeService.provider,
        {
          provide: LTO_PUBLIC_API,
          useValue: 'http://test_endpoint'
        }
      ]
    });

    publicNode = TestBed.get(PublicNodeService);
  });

  it('should create', () => {
    expect(publicNode).toBeTruthy();
  });
});
