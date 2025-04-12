import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwapType } from '../../swap-type';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BridgeService } from '../../../../../core';

@Component({
    selector: 'lto-wallet-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    standalone: false
})
export class ExampleComponent implements OnInit {
  @Input() swapType!: SwapType;
  @Output() nextStep = new EventEmitter<void>();

  burnRatePct$!: Observable<number>;
  burnedTokens$!: Observable<number>;
  receiving$!: Observable<number>;
  burnFeeERC$!: Observable<number>;
  burnFeeMain$!: Observable<number>;

  ercDesiting = 1000;

  get bridgeFee$(): Observable<number> {
    switch (this.swapType) {
      case SwapType.MAIN_ERC20:
      case SwapType.ERC20_BINANCE:
        return this.burnFeeERC$;
      default:
        return this.burnFeeMain$;
    }
  }

  get fromTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.ERC20_BINANCE:
        return 'ERC-20';
      case SwapType.BINANCE_MAIN:
        return 'BEP-2';
      case SwapType.BEP20_MAIN:
        return 'BEP-20';
      case SwapType.MAIN_ERC20:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
      case SwapType.MAIN_BEP20:
        return 'MAINNET';
    }
  }

  get fromColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.ERC20_BINANCE:
        return 'blue';
      case SwapType.BINANCE_MAIN:
      case SwapType.BEP20_MAIN:
        return 'yellow';
      case SwapType.MAIN_ERC20:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
      case SwapType.MAIN_BEP20:
        return 'purple';
    }
  }

  get toTokenType(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.BEP20_MAIN:
      case SwapType.MAIN_BINANCEEXCHANGE:
        return 'MAINNET';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
        return 'BEP-2';
      case SwapType.MAIN_BEP20:
        return 'BEP-20';
      case SwapType.MAIN_ERC20:
        return 'ERC-20';
    }
  }

  get toColor(): string {
    switch (this.swapType) {
      case SwapType.ERC20_MAIN:
      case SwapType.BINANCE_MAIN:
      case SwapType.BEP20_MAIN:
        return 'purple';
      case SwapType.ERC20_BINANCE:
      case SwapType.MAIN_BINANCE:
      case SwapType.MAIN_BINANCEEXCHANGE:
      case SwapType.MAIN_BEP20:
        return 'yellow';
      case SwapType.MAIN_ERC20:
        return 'blue';
    }
  }


  ltoWithdrawing = 1000;

  receiving(fee: number): number {
    if (this.ercDesiting < fee) {
      return 0;
    }

    return this.ercDesiting - fee;
  }

  get burnedTokens(): number {
    return this.ltoWithdrawing / 2;
  }

  get ercReceving(): number {
    return this.ltoWithdrawing / 2;
  }

  get isERC20ToMain(): boolean {
    return (
      this.swapType === SwapType.ERC20_MAIN ||
      this.swapType === SwapType.BINANCE_MAIN ||
      this.swapType === SwapType.ERC20_BINANCE
    );
  }

  constructor(private _bridge: BridgeService) {}

  ngOnInit() {
    this.burnRatePct$ = this._bridge.burnRate$.pipe(map(rate => rate * 100));
    this.burnedTokens$ = this._bridge.burnRate$.pipe(map(rate => rate * 1000));
    this.receiving$ = this.burnedTokens$.pipe(map(burned => 1000 - burned));
    this.burnFeeERC$ = this._bridge.burnFees$.pipe(map(fees => fees.lto20));
    this.burnFeeMain$ = this._bridge.burnFees$.pipe(map(fees => fees.lto));
  }

  nextStepClick() {
    this.nextStep.next();
  }
}
