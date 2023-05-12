import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LedgerService } from '@app/core/services';
import { CreateScriptModal, ScriptInfoModal, DisableScriptModal } from '@app/modals';
import {
  AuthService,
  ILedgerAccount,
  IUserAccount,
  ScriptsService,
  FeeService,
  toPromise,
} from '@app/core';

@Component({
  selector: 'lto-wallet-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  ledger$!: Subscription;
  ledgerAccount!: ILedgerAccount | null;

  selectedLedgerId!: number;
  ledgerIdOptions: number[];

  user$!: Subscription;
  userAccount!: IUserAccount | null;

  lto$!: Subscription;
  ltoAccount!: Account | null;

  scriptEnabled$: Observable<boolean>;

  constructor(
    private auth: AuthService,
    private _createScriptModal: CreateScriptModal,
    private _scriptService: ScriptsService,
    private _snackbar: MatSnackBar,
    private _feeService: FeeService,
    private _scriptInfoModal: ScriptInfoModal,
    private _disableScriptModal: DisableScriptModal,
    private _ledgerService: LedgerService
  ) {
    this.scriptEnabled$ = _scriptService.scriptEnabled$;
    this.ledgerIdOptions = Array.from(Array(10).keys());
  }

  ngOnInit() {
    this.lto$ = this.auth.wallet$.subscribe((ltoAccount) => (this.ltoAccount = ltoAccount));
    this.user$ = this.auth.account$.subscribe((userAccount) => (this.userAccount = userAccount));
    this.ledger$ = this.auth.ledgerAccount$.subscribe(
      (ledgerAccount) => (this.ledgerAccount = ledgerAccount)
    );
    this.selectedLedgerId = this._ledgerService.ledgerId;
  }

  ngOnDestroy() {
    this.lto$.unsubscribe();
    this.user$.unsubscribe();
    this.ledger$.unsubscribe();
  }

  onChangeLedgerId(newValue: number) {
    this.selectedLedgerId = newValue;
    this._ledgerService.ledgerId = newValue;
    this._ledgerService.updateUserData();
  }

  async createScript() {
    const scriptText = await this._createScriptModal.show();
    if (!scriptText) {
      return;
    }

    try {
      await this._scriptService.createScript(scriptText.trim());
      this._snackbar.open('Script created', 'DISMISS', {
        duration: 3000,
      });
    } catch (error) {
      this._snackbar.open('Cannot create script', 'DISMISS', {
        duration: 3000,
      });
    }
  }

  async disableScript() {
    const fee = await toPromise(this._feeService.setScriptFee$);
    const disable = await this._disableScriptModal.show(fee);
    if (!disable) {
      return;
    }
    try {
      this._scriptService.disabeScript();
      this._snackbar.open('Script removed', 'DISMISS', {
        duration: 3000,
      });
    } catch (error) {
      this._snackbar.open('Cannot remove script', 'DISMISS', {
        duration: 3000,
      });
    }
  }

  showScriptInfo() {
    this._scriptInfoModal.show();
  }
}
