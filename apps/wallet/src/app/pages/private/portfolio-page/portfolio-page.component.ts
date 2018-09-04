import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, filter } from 'rxjs/operators';
import { AccountManagementService } from '@wallet/core';
import { Account } from 'lto-api';
import { LtoPublicNodeService } from '@legalthings-one/platform';
import { MakeTransactionModal, ReceiveModal } from '@wallet/shared';

@Component({
  selector: 'lto-wallet-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.scss']
})
export class PortfolioPageComponent implements OnInit {
  balance$: Observable<any>;

  constructor(
    account: AccountManagementService,
    publicNode: LtoPublicNodeService,
    private _makeTransactionModal: MakeTransactionModal,
    private _receiveFundsModal: ReceiveModal
  ) {
    this.balance$ = account.wallet$.pipe(
      filter((account): account is Account => !!account),
      switchMap(account => publicNode.balanceOf(account.address)),
      shareReplay(1)
    );
  }

  ngOnInit() {}

  makeTransaction() {
    this._makeTransactionModal.show();
  }

  receive() {
    this._receiveFundsModal.show();
  }
}
