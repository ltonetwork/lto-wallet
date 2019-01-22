import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap, switchMapTo, distinctUntilChanged } from 'rxjs/operators';
import { LTO_PUBLIC_API } from './tokens';

/**
 * Provide communication with LTO backend
 */
@Injectable({
  providedIn: 'root'
})
export class LtoPublicNodeService {
  constructor(private _http: HttpClient, @Inject(LTO_PUBLIC_API) private _publicApi: string) {}

  version(): Observable<string> {
    return this._http.get<any>(this._publicApi + 'node/version').pipe(map(data => data.version));
  }

  height(): Observable<number> {
    return this._http.get<any>(this._publicApi + 'blocks/height').pipe(map(data => data.height));
  }

  lastBlocks(
    count: number = 20,
    poll: boolean = false,
    pollInterval: number = 5000
  ): Observable<any> {
    let pollTimer = poll ? timer(0, pollInterval) : timer(0);
    return pollTimer.pipe(
      switchMapTo(this.height()),
      distinctUntilChanged(),
      switchMap(height => this.headerSequence(height, count))
    );
  }

  headerSequence(height: number, count: number): Observable<any[]> {
    let from = height - count + 1; // Exclude last one
    from = from < 0 ? 0 : from; // Prevent height less than zero
    return this._http
      .get<any[]>(this._publicApi + 'blocks/headers/seq/' + from + '/' + height)
      .pipe(map(blocks => blocks.reverse()));
  }

  transaction(id: string): Observable<any> {
    return this._http.get<any>(this._publicApi + 'transactions/info/' + id);
  }

  block(height: number | string): Observable<any> {
    return this._http.get<any>(this._publicApi + 'blocks/at/' + height);
  }

  transactionsOf(address: string, limit: number): Observable<any> {
    return this._http.get(this._publicApi + 'transactions/address/' + address + '/limit/' + limit);
  }

  balanceOf(address: string): Observable<any> {
    return this._http.get<any>(this._publicApi + 'addresses/balance/details/' + address);
  }

  unconfirmedTransactions(): Observable<any[]> {
    return this._http.get<any>(this._publicApi + 'transactions/unconfirmed');
  }

  getLastBlock(): Observable<any[]> {
    return this._http.get<any>(`${this._publicApi}blocks/last`);
  }

  getLastBlocks(): Observable<any[]> {
    return this.height().pipe(switchMap(height => this.headerSequence(height, 20)));
  }
}
