import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WalletService } from '../core';
import { MakeTransactionModal, WithdrawModal, DepositModal } from '../modals';

@Component({
    selector: 'lto-transfers',
    templateUrl: './transfers.component.html',
    styleUrls: ['./transfers.component.scss'],
    standalone: false
})
export class TransfersComponent implements OnInit {
  balance$: Observable<any>;
  transfers$: Observable<LTO.Page<LTO.Transaction>>;
  address$: Observable<string>;

  visibleColumns = ['id'];

  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  selectedTransaction: any = null;

  constructor(
    private wallet: WalletService,
    private makeTransactionModal: MakeTransactionModal,
    private withdrawModal: WithdrawModal,
    private depositModal: DepositModal
  ) {
    this.address$ = wallet.address$;
    this.balance$ = wallet.balance$;
    this.transfers$ = wallet.transfers$;
  }

  ngOnInit() {}

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }

  makeTransaction() {
    this.makeTransactionModal.show();
  }

  withdraw() {
    this.withdrawModal.show();
  }

  async deposit() {
    await this.depositModal.show();
  }

  trackByFn(transaction: any) {
    return transaction.id;
  }
}
