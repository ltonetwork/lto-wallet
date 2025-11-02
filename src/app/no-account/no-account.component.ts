import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LedgerService } from '@app/core';
import { MobileAuthModal } from '@app/modals/mobile-auth-modal';
import { WalletConnectModal } from '@app/modals/walletconnect-modal';

@Component({
    selector: 'lto-no-account',
    templateUrl: './no-account.component.html',
    styleUrls: ['./no-account.component.scss'],
    standalone: false
})
export class NoAccountComponent {
  constructor(
  ) {}
}
