import { TestBed } from '@angular/core/testing';
import { EncoderService } from './encoder.service';
import { WavesService } from './waves.service';

describe('Core/WavesService', () => {
  let waves: WavesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WavesService.provider,
        EncoderService
      ]
    });

    waves = TestBed.get(WavesService);
  });

  it('should create', () => {
    expect(waves).toBeTruthy();
  });

  it('should return true if address is valid', () => {
    const address = '3P274YB5qseSE9DTTL3bpSjosZrYBPDpJ8k';
    expect(waves.isValidAddress(address)).toBeTruthy();
  });
});
