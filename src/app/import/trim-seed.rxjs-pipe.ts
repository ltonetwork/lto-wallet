import { Observable } from "rxjs";

/**
 * Trim, remove extranumerary spaces and lowercase the seed
 *
 * rxjs pipe
 */
export function trimSeed() {
  return function (source: Observable<any>): Observable<any> {
    return new Observable(subscriber => {
      source.subscribe({
        next(value) {
          value.seed = value.seed.trim();
          if (value.tidy) {
            value.seed = value.seed.toLowerCase().replace(/\s{2,}/gm, ' ');
          }
          subscriber.next(value);
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      })
    });
  }
}
