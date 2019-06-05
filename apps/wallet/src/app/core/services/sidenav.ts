import { Injectable } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { Observable, Subject, merge } from 'rxjs';
import { shareReplay, map, take } from 'rxjs/operators';

export type SidenavMode = 'over' | 'side';

@Injectable()
export class SidenavImpl implements Sidenav {
  mode$: Observable<SidenavMode>;
  opened$: Observable<boolean>;
  hasBackdrop$: Observable<boolean>;

  private _opened$: Subject<boolean> = new Subject();

  constructor(media: ObservableMedia) {
    this.mode$ = media.asObservable().pipe(
      map(mediaChange => {
        switch (mediaChange.mqAlias) {
          case 'lg':
          case 'xl':
            return 'side';
          default:
            return 'over';
        }
      }),
      shareReplay(1)
    );

    this.opened$ = merge(this._opened$, this.mode$.pipe(map(mode => mode === 'side'))).pipe(
      shareReplay(1)
    );

    this.hasBackdrop$ = this.mode$.pipe(map(mode => mode === 'over'));
  }

  open() {
    this._opened$.next(true);
  }

  close() {
    this.mode$.pipe(take(1)).subscribe(mode => {
      if (mode === 'over') {
        this._opened$.next(false);
      }
    });
  }
}

export abstract class Sidenav {
  static provider = {
    provide: Sidenav,
    useClass: SidenavImpl
  };

  abstract mode$: Observable<SidenavMode>;
  abstract opened$: Observable<boolean>;
  abstract hasBackdrop$: Observable<boolean>;

  abstract open(): void;
  abstract close(): void;
}
