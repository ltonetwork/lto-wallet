import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BridgeService, WalletService } from '../../../../../core';

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

  get cannotSend(): boolean {
    return !this.confirmed || !this.captchaResponse;
  }

  constructor(private _wallet: WalletService) {}

  ngOnInit() {
    this.withdrawForm = new FormGroup({
      amount: new FormControl(0, [Validators.min(0), Validators.required]),
      address: new FormControl('', [Validators.required])
    });
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
    this.transfer$ = this._wallet.withdraw(address, amount, 0, this.captchaResponse);
  }

  closeClick() {
    this.close.next();
  }
}
