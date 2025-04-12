import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LTO_PUBLIC_API } from '../../tokens';
import { PublicNode } from './public-node';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('Core/PublicNode', () => {
  let publicNode: PublicNode;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [
        PublicNode.provider,
        {
            provide: LTO_PUBLIC_API,
            useValue: 'http://test_endpoint'
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});

    publicNode = TestBed.get(PublicNode);
  });

  it('should create', () => {
    expect(publicNode).toBeTruthy();
  });
});
