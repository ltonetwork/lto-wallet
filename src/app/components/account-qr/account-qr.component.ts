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
  account!: { '@schema': string, name?: string, address?: string, seed?: string };
  show = false;

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.lto$ = this.auth.account$.subscribe((ltoAccount) => (this.account = {
      '@schema': 'http://schema.lto.network/account-seed.json',
      name: ltoAccount?.name,
      address: ltoAccount?.address,
      seed: ltoAccount?.encryptedSeed,
    }));
  }
}
