import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { BehaviorSubject } from 'rxjs';

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

  constructor() {}

  connect() {
    if (this.subject) {
      throw new Error('Already connected');
    }

    this.subject = webSocket('ws://localhost:3030/connect');

    this.subject.subscribe({
      next: data => {
        if (this.dataIsCode(data)) {
          this.challenge$.next({
            '@schema': 'http://schema.lto.network/basic-auth-v1.json',
            'url': 'http://localhost:3030/' + data.code
          });
          console.log('set challenge', data);
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
