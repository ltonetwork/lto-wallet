import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BridgeService, WalletService } from '../../../../../core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'lto-wallet-deposit-erc',
  templateUrl: './deposit-erc.component.html',
  styleUrls: ['./deposit-erc.component.scss']
})
export class DepositErcComponent implements OnInit {
  @Output() close = new EventEmitter();

  captchaResponse = '';
  address$: Observable<string> | null = null;

  constructor(private _bridge: BridgeService, private _wallet: WalletService) {}

  ngOnInit() {}

  resolveCaptcha(response: string) {
    this.captchaResponse = response;
    this.address$ = this._wallet.address$.pipe(
      switchMap(address => this._bridge.depositTo(address, response))
    );
  }

  closeClick() {
    this.close.next();
  }
}
