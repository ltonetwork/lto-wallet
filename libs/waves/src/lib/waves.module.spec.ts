
import { async, TestBed } from '@angular/core/testing';
import { WavesModule } from './waves.module';

describe('WavesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ WavesModule ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    expect(WavesModule).toBeDefined();
  });
});
      