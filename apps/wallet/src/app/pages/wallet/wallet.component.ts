import { Component, OnInit } from '@angular/core';
import { Account } from 'lto-api';
import { AccountManagementService } from '@wallet/core';
import { Observable } from 'rxjs';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { shareReplay, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'lto-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  wallet$: Observable<Account | null>;
  balance$: Observable<any>;
  transactions$: Observable<any[] | undefined>;

  constructor(
    private _accountManager: AccountManagementService,
    private _publicNode: LtoPublicNodeService
  ) {
    this.wallet$ = _accountManager.wallet$;
    const address$ = this.wallet$.pipe<string>(map((wallet: Account) => wallet.address));
    this.balance$ = address$.pipe(
      switchMap(address => _publicNode.balanceOf(address)),
      shareReplay(1)
    );

    this.transactions$ = address$.pipe(
      switchMap(address => _publicNode.transactionsOf(address, 100)),
      map(result => result[0]), // For a some reason result is array of one element
      shareReplay(1)
    );
  }

  ngOnInit() {}
}
