import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LedgerService } from '@app/core';
import { MobileAuthModal } from '@app/modals/mobile-auth-modal';

@Component({
    selector: 'lto-no-account',
    templateUrl: './no-account.component.html',
    styleUrls: ['./no-account.component.scss'],
    standalone: false
})
export class NoAccountComponent {
  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private ledger: LedgerService,
    private mobileAuthModal: MobileAuthModal,
  ) {}

  async mobileLogin() {
    await this.mobileAuthModal.show();
  }

  async connectLedger() {
    try {
      await this.ledger.connect();

      this.snackbar.open('Logged in via Ledger', 'Dismiss', { duration: 3000 });
      this.router.navigate(['/']);
    } catch (error: unknown) {
      console.error('Error while connecting to ledger: ', error);

      if (typeof error === 'object' && error !== null && `statusCode` in error && error.statusCode === 26628) {
        this.snackbar.open(
          'Ledger device: Transport error, unlock device and try again (0x6804)',
          'Dismiss',
          { duration: 6000 }
        );
        return;
      }

      const message = (error as any)?.message || 'Unknown error';
      this.snackbar.open(message, 'Dismiss', { duration: 6000 });
    }
  }
}
