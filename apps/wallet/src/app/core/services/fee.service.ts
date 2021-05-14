import { Injectable, Inject } from '@angular/core';
import { Observable, of, combineLatest } from 'rxjs';
import { AuthService } from './auth.service';
import { PublicNode } from './public-node';
import { switchMap, filter, map, shareReplay } from 'rxjs/operators';
import { DEFAULT_TRANSFER_FEE, MASS_TRANSFER_FEE } from '@wallet/tokens';

@Injectable({ providedIn: 'root' })
export class FeeService {
  scriptFee$: Observable<number>;
  regularFee$: Observable<number>;

  transferFee$: Observable<number>;
  massTransferFee$: Observable<number>;
  leaseFee$: Observable<number>;
  anchorFee$: Observable<number>;

  constructor(
    private _auth: AuthService,
    private _publicNode: PublicNode,
    @Inject(DEFAULT_TRANSFER_FEE) transferFee: number,
    @Inject(MASS_TRANSFER_FEE) massTransferFee: number
  ) {
    this.scriptFee$ = _auth.account$.pipe(
      switchMap(account => {
        if (!account) {
          return of([]);
        }
        return _publicNode.getScript(account.address);
      }),
      map(scriptInfo => {
        return scriptInfo.extraFee;
      })
    );

    this.regularFee$ = of(transferFee);
    this.massTransferFee$ = of(massTransferFee);

    this.transferFee$ = combineLatest(this.scriptFee$, this.regularFee$).pipe(
      map(([scriptFee, regularFee]) => {
        return scriptFee ? scriptFee : regularFee;
      }),
      shareReplay(1)
    );

    this.leaseFee$ = this.transferFee$;
    this.anchorFee$ = this.transferFee$;
  }
}
