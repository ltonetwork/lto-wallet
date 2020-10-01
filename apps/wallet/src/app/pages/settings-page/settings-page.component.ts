import { Component, OnInit } from '@angular/core';
import { AuthService, IUserAccount, ScriptsService, FeeService, toPromise } from '../../core';
import { CreateScriptModal, ScriptInfoModal, DisableScriptModal } from '../../modals';
import { Observable, of } from 'rxjs';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'lto-wallet-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  userAccount$: Observable<IUserAccount | null>;
  ltoAccount$: Observable<Account | null>;
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
    this.userAccount$ = auth.account$;
    this.ltoAccount$ = auth.wallet$;
    this.scriptEnabled$ = _scriptService.scriptEnabled$;
  }

  ngOnInit() {}

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
