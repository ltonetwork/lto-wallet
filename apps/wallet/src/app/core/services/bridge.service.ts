import { Injectable, Inject, ClassProvider } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LTO_BRIDGE_HOST } from '../../tokens';

type TokenType = 'LTO' | 'LTO20';

@Injectable()
export class BridgeServiceImpl {
  constructor(@Inject(LTO_BRIDGE_HOST) private ltoBridgeHost: string, private http: HttpClient) {}

  createBridgeAddress(
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
}

export abstract class BridgeService {
  static provider: ClassProvider = {
    provide: BridgeService,
    useClass: BridgeServiceImpl
  };

  abstract createBridgeAddress(
    fromToken: TokenType,
    toToken: TokenType,
    toAddress: string
  ): Observable<string>;
}
