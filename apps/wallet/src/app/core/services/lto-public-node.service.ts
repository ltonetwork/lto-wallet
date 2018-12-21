import { Injectable, Inject, ClassProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { map, switchMap, switchMapTo, distinctUntilChanged } from 'rxjs/operators';
import { LTO_PUBLIC_API } from '../../tokens';

/**
 * Provide communication with LTO backend
 */
@Injectable()
export class LtoPublicNodeServiceImpl implements LtoPublicNodeService {
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
    const pollTimer = poll ? timer(0, pollInterval) : timer(0);
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

  transactionsOf(address: string): Observable<any> {
    return this._http
      .get<any>(this._publicApi + 'transactions/address/' + address + '/limit/' + 200)
      .pipe(map(response => response[0]));
  }

  indexedTransactions(
    address: string,
    index: string = 'anchor',
    limit = 100
  ): Observable<LTO.Page<LTO.Transaction>> {
    const params: any = {
      limit,
      type: index
    };
    return this._http
      .get<any[]>(this._publicApi + 'index/transactions/addresses/' + address, {
        params,
        observe: 'response'
      })
      .pipe(
        map(response => {
          const total = parseInt(response.headers.get('x-total') || '0', 10);
          return {
            total,
            items: response.body || []
          };
        })
      );
  }

  balanceOf(address: string): Observable<any> {
    return this._http.get<any>(this._publicApi + 'addresses/balance/details/' + address);
  }

  unconfirmedTransactions(): Observable<any[]> {
    return this._http.get<any>(this._publicApi + 'transactions/unconfirmed');
  }
}

export abstract class LtoPublicNodeService {
  static provider: ClassProvider = {
    provide: LtoPublicNodeService,
    useClass: LtoPublicNodeServiceImpl
  };

  abstract version(): Observable<string>;
  abstract height(): Observable<number>;
  abstract lastBlocks(count: number, poll: boolean, pollInterval: number): Observable<any[]>;
  abstract headerSequence(height: number, count: number): Observable<any[]>;
  abstract transaction(id: string): Observable<any>;
  abstract block(height: number | string): Observable<any>;
  abstract transactionsOf(address: string): Observable<LTO.Transaction[]>;
  abstract indexedTransactions(
    address: string,
    index?: string,
    limit?: number
  ): Observable<LTO.Page<LTO.Transaction>>;
  abstract balanceOf(address: string): Observable<any>;
  abstract unconfirmedTransactions(): Observable<any[]>;
}
