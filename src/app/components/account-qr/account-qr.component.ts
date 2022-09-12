import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@app/core';

@Component({
  selector: 'lto-wallet-account-qr',
  templateUrl: './account-qr.component.html',
  styleUrls: ['./account-qr.component.scss']
})
export class AccountQrComponent implements OnInit {
  lto$!: Subscription;
  account!: { '@schema': string, address?: string, seed?: string };
  show = false;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.lto$ = this.auth.wallet$.subscribe((ltoAccount) => (this.account = {
      '@schema': 'http://schema.lto.network/account-seed.json',
      address: ltoAccount?.address,
      seed: ltoAccount?.seed,
    }));
  }
}
