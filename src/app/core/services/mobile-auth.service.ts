import { Inject, Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';
import { LTO_MOBILE_AUTH } from '@app/tokens';

export interface IPublicAccount {
  address: string;
  keyType: string;
  publicKey: string;
}

export interface IMobileAuthChallenge {
  '@schema': string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class MobileAuthService {
  subject?: WebSocketSubject<{data: string}|IPublicAccount>;
  challenge$ = new BehaviorSubject<IMobileAuthChallenge|null>(null);
  account$ = new BehaviorSubject<IPublicAccount|null>(null);

  constructor(@Inject(LTO_MOBILE_AUTH) private settings: {ws: string, url: string}) {}

  connect() {
    if (this.subject) {
      throw new Error('Already connected');
    }

    this.subject = webSocket(this.settings.ws);

    this.subject.subscribe({
      next: data => {
        if (this.dataIsCode(data)) {
          this.challenge$.next({
            '@schema': 'http://schema.lto.network/simple-auth-v1.json',
            'url': this.settings.url + data.code
          });
        } else if (this.dataIsAccount(data)) {
          this.account$.next(data);
          this.subject?.complete();
        }
      },
      error: err => {
        (this.challenge$.getValue() === null ? this.challenge$ : this.account$).error(err);
        delete this.subject;
      },
      complete: () => {
        this.challenge$.next(null);
        delete this.subject;
      }
    });
  }

  private dataIsCode(data: object): data is { code: string } {
    return typeof (data as any).code !== 'undefined';
  }

  private dataIsAccount(data: object): data is IPublicAccount {
    return typeof (data as any).address !== 'undefined';
  }
}
