import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, Subject, merge } from 'rxjs';
import { shareReplay, map, take } from 'rxjs/operators';

export enum SidenavMode {
  over = 'over',
  side = 'side',
}

@Injectable()
export class SidenavImpl implements Sidenav {
  mode$: Observable<SidenavMode>;
  opened$: Observable<boolean>;
  hasBackdrop$: Observable<boolean>;

  private _opened$: Subject<boolean> = new Subject();

  constructor(media: MediaObserver) {
    this.mode$ = media.asObservable().pipe(
      map((mediaChanges) => {
        const mediaChange = mediaChanges[0];
        switch (mediaChange.mqAlias) {
          case 'lg':
          case 'xl':
            return SidenavMode.side;
          default:
            return SidenavMode.over;
        }
      }),
      shareReplay(1)
    );

    this.opened$ = merge(
      this._opened$,
      this.mode$.pipe(map((mode) => mode === SidenavMode.side))
    ).pipe(shareReplay(1));

    this.hasBackdrop$ = this.mode$.pipe(map((mode) => mode === SidenavMode.over));
  }

  open() {
    this._opened$.next(true);
  }

  close() {
    this.mode$.pipe(take(1)).subscribe((mode) => {
      if (mode === SidenavMode.over) {
        this._opened$.next(false);
      }
    });
  }
}

export abstract class Sidenav {
  static provider = {
    provide: Sidenav,
    useClass: SidenavImpl,
  };

  abstract mode$: Observable<SidenavMode>;
  abstract opened$: Observable<boolean>;
  abstract hasBackdrop$: Observable<boolean>;

  abstract open(): void;
  abstract close(): void;
}
