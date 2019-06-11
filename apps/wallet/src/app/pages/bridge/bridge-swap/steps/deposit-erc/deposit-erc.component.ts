import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BridgeService, WalletService } from '../../../../../core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SwapType } from '../../swap-type';

@Component({
  selector: 'lto-wallet-deposit-erc',
  templateUrl: './deposit-erc.component.html',
  styleUrls: ['./deposit-erc.component.scss']
})
export class DepositErcComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() close = new EventEmitter();

  captchaResponse = '';
  address$: Observable<string> | null = null;

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'BINANCE';
    }
  }

  get otherColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'yellow';
    }
  }

  constructor(private _bridge: BridgeService, private _wallet: WalletService) {}

  ngOnInit() {}

  resolveCaptcha(response: string) {
    this.captchaResponse = response;
    const tokenType = this.swapType === SwapType.ERC20_MAIN ? 'LTO20' : 'BINANCE';
    this.address$ = this._wallet.address$.pipe(
      switchMap(address => this._bridge.depositTo(address, response, tokenType))
    );
  }

  closeClick() {
    this.close.next();
  }
}
