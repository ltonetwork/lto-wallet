import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { formControlErrors, IBalance, LedgerService, WalletService } from '@app/core';
import { MakeTransactionService } from '@app/core/services/make-transaction.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'lto-wallet-make-transaction-transfers',
  templateUrl: './make-transaction-transfers.component.html',
  styleUrls: ['./make-transaction-transfers.component.scss'],
})
export class MakeTransactionTransfersComponent implements OnInit {
  @Input() sendForm: UntypedFormGroup | undefined;

  ledger$!: Observable<boolean>;
  balance$!: Observable<IBalance>;
  transferVisible = 0;

  constructor(
    private wallet: WalletService,
    private _ledgerService: LedgerService,
    private _transactionService: MakeTransactionService
  ) {}

  ngOnInit() {
    this.balance$ = this.wallet.balance$;
    this.ledger$ = this._ledgerService.connected$;
  }

  get recipientErrors() {
    const errors = formControlErrors(this.sendForm ?? null, 'recipient');
    return errors;
  }

  addTransfer() {
    this._transactionService.addTransfer();
    let transfers = <UntypedFormArray>this.sendForm?.get('transfers');
    this.transferVisible = transfers.length - 1;
  }

  /**
   * Remove a transfer
   * @param row If set: remove the row at the specified position. If not set: remove the currenctly visible row
   */
  delTransfer(row?: number) {
    this._transactionService.delTransfer(row ?? this.transferVisible);
    this.previous();
  }

  previous() {
    if (this.transferVisible > 0) this.transferVisible--;
    this._transactionService.updateFee();
  }

  next() {
    if (this.transferVisible < (<UntypedFormArray>this.sendForm?.controls.transfers).length - 1)
      this.transferVisible++;
    this._transactionService.updateFee();
  }

  updateAmountsValidators() {
    this._transactionService.updateAmountsValidators();
  }

  get transfersCount() {
    return (<UntypedFormArray>this.sendForm?.controls.transfers).length;
  }

  get transferMaxAmount() {
    const transfers = this._transactionService.transfers;
    const transfer = <UntypedFormGroup>transfers.controls[this.transferVisible];
    const amountControl = transfer.controls.amount;
    return this._transactionService.getTransferMaxAmount(amountControl.value);
  }
}
