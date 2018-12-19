import { Component, OnInit } from '@angular/core';
import { WalletService, AuthService, IUserAccount } from '../../core';
import { Observable } from 'rxjs';
import { Account } from 'lto-api';

@Component({
  selector: 'lto-wallet-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  userAccount$: Observable<IUserAccount | null>;
  ltoAccount$: Observable<Account | null>;

  constructor(private auth: AuthService) {
    this.userAccount$ = auth.account$;
    this.ltoAccount$ = auth.wallet$;
  }

  ngOnInit() {}
}
