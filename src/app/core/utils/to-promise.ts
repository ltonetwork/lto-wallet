import { firstValueFrom, Observable } from 'rxjs';

export function toPromise<T>(observable: Observable<T>): Promise<T> {
  return firstValueFrom(observable);
}
