import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material/snack-bar';

import {  } from '@wallet/core/services/ledger.service';
import { CreateScriptModal, ScriptInfoModal, DisableScriptModal } from '@wallet/modals';
import { AuthService, ILedgerAccount, IUserAccount, ScriptsService, FeeService, toPromise } from '@wallet/core';

@Component({
  selector: 'lto-wallet-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  ledger$!: Subscription;
  ledgerAccount!: ILedgerAccount | null;

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
    private _disableScriptModal: DisableScriptModal
  ) {
    this.scriptEnabled$ = _scriptService.scriptEnabled$;
  }

  ngOnInit() {
    this.lto$ = this.auth.wallet$.subscribe(ltoAccount => this.ltoAccount = ltoAccount); 
    this.user$ = this.auth.account$.subscribe(userAccount => this.userAccount = userAccount);
    this.ledger$ = this.auth.ledgerAccount$.subscribe(ledgerAccount => this.ledgerAccount = ledgerAccount);
  }

  ngOnDestroy() {
    this.lto$.unsubscribe();
    this.user$.unsubscribe();
    this.ledger$.unsubscribe();
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
    const fee = await toPromise(this._feeService.transferFee$);
    const disable = await this._disableScriptModal.show(fee);
    if (!disable) {
      return;
    }
    try {
      this._scriptService.disabeScript(fee);
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
