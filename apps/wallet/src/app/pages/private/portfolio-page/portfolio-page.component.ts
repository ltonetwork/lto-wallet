import { Component, OnInit } from '@angular/core';
import { Wallet } from '@wallet/core';
import { MakeTransactionModal, ReceiveModal } from '@wallet/shared';

@Component({
  selector: 'lto-wallet-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {
  constructor(
    public wallet: Wallet,
    private makeTransactionModal: MakeTransactionModal,
    private receiveFundsModal: ReceiveModal
  ) {}

  ngOnInit() {}

  makeTransaction() {
    this.makeTransactionModal.show();
  }

  receive() {
    this.receiveFundsModal.show();
  }
}
