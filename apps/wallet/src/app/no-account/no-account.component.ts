import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LedgerService } from '@wallet/core';

@Component({
  selector: 'lto-no-account',
  templateUrl: './no-account.component.html',
  styleUrls: ['./no-account.component.scss']
})
export class NoAccountComponent {

  constructor(
    private router: Router,
    private snackbar: MatSnackBar,
    private ledger: LedgerService,
  ) { }

  async connectLedger() {
    try {
      // @todo: add possibility for choosing account id (0-10)
      await this.ledger.connect(0);

      this.snackbar.open('Logged in via Ledger', 'Dismiss', { duration: 3000 });
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error while connecting to ledger: ', error);
      this.snackbar.open(error.message, 'Dismiss', { duration: 6000 });
    }
  }

}
