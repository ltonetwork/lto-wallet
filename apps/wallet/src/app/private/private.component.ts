import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenService, AuthService } from '../core';
import { BackupAccountModal, AccountInfoModal, SettingsModal } from './modals';
import { Router } from '@angular/router';

import { MyWallet } from './services/my-wallet.service';

@Component({
  selector: 'lto-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
  providers: [MyWallet.provider]
})
export class PrivateComponent implements OnInit {
  sidenavMode$: Observable<string>;

  constructor(
    private screen: ScreenService,
    private backupAccountModal: BackupAccountModal,
    private auth: AuthService,
    private router: Router,
    private accountInfo: AccountInfoModal,
    private settings: SettingsModal
  ) {
    this.sidenavMode$ = screen.mediaAlias$.pipe(
      map(alias => {
        switch (alias) {
          case 'lg':
          case 'xl':
            return 'side';
          default:
            return 'over';
        }
      })
    );
  }

  ngOnInit() {}

  backupAccount() {
    this.backupAccountModal.show();
  }

  signOut() {
    this.auth.logout();
    this.router.navigate(['/', 'auth']);
  }

  showAccountInfo() {
    this.accountInfo.show(this.auth.wallet);
  }

  showSettings() {
    this.settings.show(this.auth.wallet);
  }
}
