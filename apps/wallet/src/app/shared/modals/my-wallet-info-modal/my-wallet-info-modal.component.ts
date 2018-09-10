import { Component, OnInit } from '@angular/core';
import { Wallet, AccountManagementService } from '../../../core';

@Component({
  selector: 'lto-wallet-my-wallet-info-modal',
  templateUrl: './my-wallet-info-modal.component.html',
  styleUrls: ['./my-wallet-info-modal.component.scss']
})
export class MyWalletInfoModalComponent implements OnInit {
  constructor(public wallet: Wallet, public accountManagement: AccountManagementService) {
    wallet.address$;
  }

  ngOnInit() {}
}
