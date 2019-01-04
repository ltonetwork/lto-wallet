import { Component, OnInit, Inject } from '@angular/core';
import { BridgeService, WalletService } from '../../core';
import { take } from 'rxjs/operators';
import { DEFAUTL_TRANSFER_FEE, AMOUNT_DIVIDER } from '../../tokens';

@Component({
  selector: 'lto-wallet-bridge-withdraw-dialog',
  templateUrl: './bridge-withdraw-dialog.component.html',
  styleUrls: ['./bridge-withdraw-dialog.component.scss']
})
export class BridgeWithdrawDialogComponent implements OnInit {
  step: number = 1;
  mainnetAmount = 0;

  get erc20Amount(): number {
    const amount = parseFloat(this.mainnetAmount + '');
    if (isNaN(amount)) {
      return 0;
    }
    return amount - amount * this.burnRate;
  }

  get burnRatePts(): number {
    return this.burnRate * 100;
  }

  erc20Address = '';
  captchaResponse: string = '';
  burnRate: number = 0;

  get cannotContinue(): boolean {
    return !this.captchaResponse || this.erc20Amount === 0 || !this.erc20Address;
  }

  constructor(
    private bridgeService: BridgeService,
    private wallet: WalletService,
    @Inject(DEFAUTL_TRANSFER_FEE) private DEFAUTL_TRANSFER_FEE: number,
    @Inject(AMOUNT_DIVIDER) private AMOUNT_DIVIDER: number
  ) {
    bridgeService.burnRate$.pipe(take(1)).subscribe(burnRate => (this.burnRate = burnRate));
  }

  ngOnInit() {}

  resolvedCaptcha(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
  }

  async transfer() {
    await this.wallet.withdraw(
      this.erc20Address,
      this.mainnetAmount,
      this.DEFAUTL_TRANSFER_FEE / this.AMOUNT_DIVIDER,
      this.captchaResponse
    );
    this.step = 2;
  }
}
