import { Component, OnInit } from '@angular/core';
import { Account } from 'lto-api';
import { AccountManagementService } from '@wallet/core';
import { Observable } from 'rxjs';
import { LtoPublicNodeService } from '@legalthings-one/platform';

@Component({
  selector: 'lto-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  wallet$: Observable<Account | null>;

  constructor(
    private _accountManager: AccountManagementService,
    private _publicNode: LtoPublicNodeService
  ) {
    this.wallet$ = _accountManager.wallet$;
  }

  ngOnInit() {}
}
