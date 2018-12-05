import { Injectable, Inject, ClassProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LTO_BRIDGE_HOST } from '../../tokens';

type TokenType = 'LTO' | 'LTO20';

interface BridgeCache {
  deposit: {
    [address: string]: string;
  };

  withdraw: {
    [recipient: string]: string;
  };
}

@Injectable()
export class BridgeServiceImpl implements BridgeService {
  readonly STORAGE_KEY = '__bridge__';

  private cache: BridgeCache;

  constructor(@Inject(LTO_BRIDGE_HOST) private ltoBridgeHost: string, private http: HttpClient) {
    // Restore bridge address from localstorage
    this.cache = this.restoreCache();
  }

  depositTo(address: string): Observable<string> {
    if (this.cache.deposit[address]) {
      return of(this.cache.deposit[address]);
    }

    return this.createBridgeAddress('LTO20', 'LTO', address).pipe(
      tap(bridge => {
        this.cache.deposit[address] = bridge;
        this.saveCache(this.cache);
      })
    );
  }

  withdrawTo(recipient: string): Observable<string> {
    if (this.cache.withdraw[recipient]) {
      return of(this.cache.withdraw[recipient]);
    }

    return this.createBridgeAddress('LTO', 'LTO20', recipient).pipe(
      tap(bridge => {
        this.cache.withdraw[recipient] = bridge;
        this.saveCache(this.cache);
      })
    );
  }

  private createBridgeAddress(
    fromToken: TokenType,
    toToken: TokenType,
    toAddress: string
  ): Observable<string> {
    return this.http
      .post<any>(this.ltoBridgeHost + '/bridge/address', {
        from_token: fromToken,
        to_token: toToken,
        to_address: toAddress
      })
      .pipe(map(response => response.address));
  }

  private restoreCache(): BridgeCache {
    const cache = localStorage.getItem(this.STORAGE_KEY);
    if (cache) {
      return JSON.parse(cache);
    }

    const initialCache: BridgeCache = {
      deposit: {},
      withdraw: {}
    };
    this.saveCache(initialCache);

    return initialCache;
  }

  private saveCache(cache: BridgeCache) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cache));
  }
}

export abstract class BridgeService {
  static provider: ClassProvider = {
    provide: BridgeService,
    useClass: BridgeServiceImpl
  };

  /**
   * Generates bridge addres to convert LTO24 -> LTO and transfer on your account
   * @param address - your account address
   */
  abstract depositTo(address: string): Observable<string>;

  /**
   * Generate bridge addres to convert LTO -> LTO20
   * @param address - recipient addres
   */
  abstract withdrawTo(recipient: string): Observable<string>;
}
