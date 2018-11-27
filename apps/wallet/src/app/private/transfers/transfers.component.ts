import { Component, OnInit } from '@angular/core';
import { ScreenService, toPromise } from '../../core';
import { MyWallet } from '../services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MakeTransactionModal, DepositModal, WithdrawModal } from '../modals';

@Component({
  selector: 'lto-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  get detailsOpened(): boolean {
    return !!this.selectedTransaction;
  }

  selectedTransaction: any = null;
  sidenavMode$: Observable<'side' | 'over'>;

  unconfirmed$: Observable<any[]>;

  balance$: Observable<any>;

  constructor(
    public wallet: MyWallet,
    public screen: ScreenService,
    private makeTraknsactionModal: MakeTransactionModal,
    private depositModal: DepositModal,
    private withdrawModal: WithdrawModal
  ) {
    this.balance$ = wallet.balance$;
    this.sidenavMode$ = screen.mode$.pipe(
      map(screenMode => (screenMode === 'mobile' ? 'over' : 'side'))
    );

    this.unconfirmed$ = wallet.uncofirmed$;
  }

  ngOnInit() {}

  select(transaction: any) {
    this.selectedTransaction = transaction;
  }

  async makeTransaction() {
    const balance = await toPromise(this.balance$);
    const transactionData = await this.makeTraknsactionModal.show(balance.available);
    if (!transactionData) {
      return;
    }

    await this.wallet.transfer(transactionData);
  }

  async deposit() {
    await this.depositModal.show();
  }

  async withdraw() {
    const balance = await toPromise(this.balance$);
    const data = await this.withdrawModal.show(balance.available);
    if (!data) {
      return;
    }

    try {
      this.wallet.withdraw(data.address, data.amount, data.fee);
    } catch (error) {
      console.error(error);
    }
  }

  trackByFn(transaction: any) {
    return transaction.id;
  }
}
