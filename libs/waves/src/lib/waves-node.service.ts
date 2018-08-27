import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap, switchMapTo, distinctUntilChanged } from 'rxjs/operators';
import { WAVES_API } from './tokens';

@Injectable({
  providedIn: 'root'
})
export class WavesNodeService {
  constructor(private _http: HttpClient, @Inject(WAVES_API) private _wavesApi: string) {}

  version$(): Observable<string> {
    return this._http.get<any>(this._wavesApi + 'node/version').pipe(map(data => data.version));
  }

  height$(): Observable<number> {
    return this._http.get<any>(this._wavesApi + 'blocks/height').pipe(map(data => data.height));
  }

  lastBlocks$(
    count: number = 20,
    poll: boolean = false,
    pollInterval: number = 5000
  ): Observable<any> {
    let pollTimer = poll ? timer(0, pollInterval) : timer(0);
    return pollTimer.pipe(
      switchMapTo(this.height$()),
      distinctUntilChanged(),
      switchMap(height => this.headerSequence$(height, count))
    );
  }

  headerSequence$(height: number, count: number): Observable<any[]> {
    const from = height - count + 1; // Exclude last one
    return this._http
      .get<any[]>(this._wavesApi + 'blocks/headers/seq/' + from + '/' + height)
      .pipe(map(blocks => blocks.reverse()));
  }

  transaction$(id: string): Observable<any> {
    return this._http.get<any>(this._wavesApi + 'transactions/info/' + id);
  }

  block$(height: number): Observable<any> {
    return this._http.get<any>(this._wavesApi + 'blocks/at/' + height);
  }

  transactionsOf$(address: string, limit: number): Observable<any> {
    return this._http.get(this._wavesApi + 'transactions/address/' + address + '/limit/' + limit);
  }

  balanceOf$(address: string): Observable<any> {
    return this._http.get<any>(this._wavesApi + 'addresses/balance/details/' + address);
  }
}
