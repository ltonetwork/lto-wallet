import { LtoPublicNodeService } from '../lto-public-node.service';
import { Observable, of } from 'rxjs';

export class LtoPublicNodeServiceMock implements LtoPublicNodeService {
  version(): Observable<string> {
    return of('');
  }

  height(): Observable<number> {
    return of(10);
  }

  lastBlocks(count: number, poll: boolean, pollInterval: number): Observable<any[]> {
    return of([]);
  }

  headerSequence(height: number, count: number): Observable<any[]> {
    return of([]);
  }

  transaction(id: string): Observable<any> {
    return of({});
  }

  block(height: number | string): Observable<any> {
    return of({});
  }

  transactionsOf(address: string): Observable<any> {
    return of({});
  }

  indexedTransactions(address: string, index?: string, limit?: number): Observable<any[]> {
    return of([]);
  }

  balanceOf(address: string): Observable<any> {
    return of({});
  }

  unconfirmedTransactions(): Observable<any[]> {
    return of([]);
  }
}
