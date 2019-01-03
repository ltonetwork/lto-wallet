import { TestBed } from '@angular/core/testing';
import { EncoderService } from './encoder.service';

describe('Core/EncoderService', () => {
  let encoder: EncoderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncoderService]
    });

    encoder = TestBed.get(EncoderService);
  });

  it('should create', () => {
    expect(encoder).toBeTruthy();
  });
});
