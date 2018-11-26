import { Component, OnInit } from '@angular/core';
import { MyWallet, ScreenService } from '../../core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MakeTransactionModal, DepositModal, WithdrawModal } from '../../modals';

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
    this.makeTraknsactionModal.show();
  }

  async deposit() {
    await this.depositModal.show();
  }

  async withdraw() {
    await this.withdrawModal.show();
  }
}
