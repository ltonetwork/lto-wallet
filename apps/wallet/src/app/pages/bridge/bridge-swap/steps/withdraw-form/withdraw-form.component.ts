import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BridgeService, WalletService } from '../../../../../core';
import { DEFAULT_TRANSFER_FEE } from '../../../../../tokens';
import { map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'lto-wallet-withdraw-form',
  templateUrl: './withdraw-form.component.html',
  styleUrls: ['./withdraw-form.component.scss']
})
export class WithdrawFormComponent implements OnInit {
  @Output() close = new EventEmitter();

  withdrawForm!: FormGroup;

  step: 'input' | 'confirm' | 'done' = 'input';

  confirmed = false;
  captchaResponse = '';

  transfer$: Promise<any> | null = null;

  burnRatePct$!: Observable<number>;
  burnedTokens$!: Observable<number>;
  receiving$!: Observable<number>;

  get cannotSend(): boolean {
    return !this.confirmed || !this.captchaResponse;
  }

  constructor(
    private _wallet: WalletService,
    private _bridge: BridgeService,
    @Inject(DEFAULT_TRANSFER_FEE) private _transferFee: number
  ) {}

  ngOnInit() {
    this.burnRatePct$ = this._bridge.burnRate$.pipe(map(rate => rate * 100));

    this.withdrawForm = new FormGroup({
      amount: new FormControl(0, [Validators.min(0), Validators.required]),
      address: new FormControl('', [Validators.required])
    });

    this.burnedTokens$ = this.withdrawForm.valueChanges.pipe(
      map(value => value.amount),
      withLatestFrom(this._bridge.burnRate$),
      map(([amount, burnRate]) => {
        const burned = amount * burnRate;
        return burned < 0.75 ? 0.75 : burned;
      })
    );

    this.receiving$ = this.withdrawForm.valueChanges.pipe(
      map(value => value.amount),
      withLatestFrom(this.burnedTokens$),
      map(([amount, burned]) => {
        return amount - burned;
      })
    );
    /**
     * amount : 1
     * Burn rate: 0.03
     * Burned tokens: amount * burnRate or 0.75 (whatever is higher)
     * Reciving: amount - burndTokens
     */
  }

  goToInputStep() {
    this.withdrawForm.enable();
    this.step = 'input';
    this.captchaResponse = '';
    this.confirmed = false;
  }

  goToConfirmation() {
    this.step = 'confirm';
    this.withdrawForm.disable();
  }

  solveCaptcha(response: string) {
    this.captchaResponse = response;
  }

  confirm() {
    this.confirmed = true;
  }

  transfer() {
    const { amount, address } = this.withdrawForm.value;
    this.transfer$ = this._wallet.withdraw(
      address,
      amount,
      this._transferFee,
      this.captchaResponse
    );
  }

  closeClick() {
    this.close.next();
  }
}
