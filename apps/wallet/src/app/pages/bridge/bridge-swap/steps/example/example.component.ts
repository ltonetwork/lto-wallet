import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwapType } from '../../swap-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BridgeService } from '../../../../../core';

@Component({
  selector: 'lto-wallet-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() nextStep = new EventEmitter();

  burnRatePct$!: Observable<number>;
  burnedTokens$!: Observable<number>;
  receiving$!: Observable<number>;

  ercDesiting = 1000;

  get bridgeFee(): number {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 0;
      default:
        return 40;
    }
  }

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'BINANCE';
      default:
        return 'MAINNET';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_BINANCE:
        return 'yellow';
      default:
        return 'purple';
    }
  }

  get otherTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
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
      case SwapType.ERC20_BINANCE:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.MAIN_BINANCE:
        return 'yellow';
    }
  }

  get ltoReceving(): number {
    if (this.ercDesiting < this.bridgeFee) {
      return 0;
    }

    return this.ercDesiting - this.bridgeFee;
  }

  ltoWithdrawing = 1000;
  get burnedTokens(): number {
    return this.ltoWithdrawing / 2;
  }

  get ercReceving(): number {
    return this.ltoWithdrawing / 2;
  }

  get isERC20ToMain(): boolean {
    return this.swapType === SwapType.ERC20_MAIN || this.swapType === SwapType.BINANCE_MAIN || this.swapType === SwapType.ERC20_BINANCE;
  }

  constructor(private _bridge: BridgeService) {}

  ngOnInit() {
    this.burnRatePct$ = this._bridge.burnRate$.pipe(map(rate => rate * 100));
    this.burnedTokens$ = this._bridge.burnRate$.pipe(map(rate => rate * 1000));
    this.receiving$ = this.burnedTokens$.pipe(map(burned => 1000 - burned));
  }

  nextStepClick() {
    this.nextStep.next();
  }
}
