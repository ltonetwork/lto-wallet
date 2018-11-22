import { TestBed } from '@angular/core/testing';
import { ScreenService, ScreenMode } from './screen.service';
import { ObservableMedia } from '@angular/flex-layout';
import { MediaChange } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

describe('Firm24/Core/ScreenService', () => {
  let screenService: ScreenService;
  let media: Subject<Partial<MediaChange>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScreenService.provider,
        {
          provide: ObservableMedia,
          useValue: new Subject()
        }
      ]
    });

    media = TestBed.get(ObservableMedia);
    screenService = TestBed.get(ScreenService);
  });

  it('should expose mediaAlias based on ObservableMedia', () => {
    screenService.mediaAlias$.pipe(take(1)).subscribe(alias => {
      expect(alias).toBe('sm');
    });
    media.next({ mqAlias: 'sm' });
  });

  it('should change mode depends on screen size', () => {
    media.next({ mqAlias: 'lg' });
    screenService.mode$.pipe(take(1)).subscribe(mode => expect(mode).toBe('normal'));

    media.next({ mqAlias: 'sm' });
    screenService.mode$.pipe(take(1)).subscribe(mode => expect(mode).toBe('mobile'));
  });
});
