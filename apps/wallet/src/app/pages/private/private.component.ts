import { Component, OnInit } from '@angular/core';
import { MyWalletInfoModal } from '../../shared';

@Component({
  selector: 'lto-wallet-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  constructor(private myWalletModal: MyWalletInfoModal) {}

  ngOnInit() {}

  showMyWalletInfo() {
    this.myWalletModal.show();
  }
}
