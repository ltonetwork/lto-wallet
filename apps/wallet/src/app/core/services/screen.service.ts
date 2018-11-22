import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

export type ScreenMode = 'mobile' | 'normal';
// export type MediaAlias = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export enum MediaAlias {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl'
}

@Injectable()
export class ScreenServiceImpl implements ScreenService {
  mode$: Observable<ScreenMode>;
  mediaAlias$: Observable<MediaAlias>;

  constructor(media: ObservableMedia) {
    this.mediaAlias$ = media.asObservable().pipe(
      map(change => change.mqAlias as MediaAlias),
      shareReplay(1)
    );

    this.mediaAlias$.subscribe(); // Make it hot

    this.mode$ = this.mediaAlias$.pipe(
      map(alias => (alias === 'xs' || alias === 'sm' ? 'mobile' : 'normal'))
    );
  }
}

export abstract class ScreenService {
  static provider = {
    provide: ScreenService,
    useClass: ScreenServiceImpl
  };

  abstract mode$: Observable<ScreenMode>;
  abstract mediaAlias$: Observable<MediaAlias>;
}
