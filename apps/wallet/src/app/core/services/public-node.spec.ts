import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LTO_PUBLIC_API } from '../../tokens';
import { PublicNode } from './public-node';

describe('Core/PublicNode', () => {
  let publicNode: PublicNode;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PublicNode.provider,
        {
          provide: LTO_PUBLIC_API,
          useValue: 'http://test_endpoint'
        }
      ]
    });

    publicNode = TestBed.get(PublicNode);
  });

  it('should create', () => {
    expect(publicNode).toBeTruthy();
  });
});
