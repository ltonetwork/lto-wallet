import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { WalletConnectService } from '@app/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-wallet-connect-modal',
  templateUrl: './wallet-connect-modal.component.html',
  styleUrls: ['./wallet-connect-modal.component.scss'],
})
export class WalletConnectModalComponent implements OnInit {
  public uri$ = this.walletConnect.uri$;

  constructor(
    private dialog: MatDialogRef<any>,
    private walletConnect: WalletConnectService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}

  async ngOnInit() {
    try {
      await this.walletConnect.init();
      await this.walletConnect.pair();

      this.walletConnect.session$.subscribe({
        next: async (session) => {
          if (!session) return;

          await this.router.navigate(['/']);
          this.dialog.close();
        },
      });
    } catch (err) {
      this.snackbar.open('Unable to connect using WalletConnect', 'Dismiss', { duration: 3000 });
      this.dialog.close();
    }
  }

  copyToClipboard(uri: string) {
    navigator.clipboard.writeText(uri).then(() => {
      this.snackbar.open('Link copied to clipboard', '', { duration: 2000 });
    }).catch(() => {
      this.snackbar.open('Failed to copy link', '', { duration: 2000 });
    });
  }
}
