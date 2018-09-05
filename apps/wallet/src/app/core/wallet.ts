import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, take, map } from 'rxjs/operators';
import { Account } from 'lto-api';
import { AccountManagementService } from './account-management.service';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { AMOUNT_DIVIDER } from '@legalthings-one/component-kit';

export interface ITransferPayload {
  amount: number;
  fee: number;
  attachment: string;
  recipient: string;
}

@Injectable({ providedIn: 'root' })
export class Wallet {
  address$: Observable<string>;
  balance$!: Observable<any>;
  transactions$!: Observable<any[]>;

  private ltoAccount$: Observable<Account>;

  constructor(
    private accountManager: AccountManagementService,
    publicNode: LtoPublicNodeService,
    @Inject(AMOUNT_DIVIDER) private amountDivider: number
  ) {
    this.ltoAccount$ = accountManager.wallet$;
    this.balance$ = this.ltoAccount$.pipe(
      switchMap(account => publicNode.balanceOf(account.address)),
      shareReplay(1)
    );
    this.transactions$ = this.ltoAccount$.pipe(
      switchMap(wallet => publicNode.transactionsOf(wallet.address, 200)),
      map(results => results[0]),
      shareReplay(1)
    );

    this.address$ = this.ltoAccount$.pipe(map(account => account.address));
  }

  transfer(data: ITransferPayload): Promise<any> {
    const { fee, amount } = data;

    return this.ltoAccount$
      .pipe(
        switchMap(wallet => {
          return this.accountManager.ltoInstance.API.PublicNode.transactions.broadcast(
            'transfer',
            {
              ...data,
              fee: fee * this.amountDivider,
              amount: amount * this.amountDivider
            },
            wallet.getSignKeys()
          );
        }),
        take(1)
      )
      .toPromise();
  }
}
