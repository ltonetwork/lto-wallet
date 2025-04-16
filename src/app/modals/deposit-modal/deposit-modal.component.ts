import { Component, OnInit } from '@angular/core';
import { toPromise } from '../../core/utils';
import { AuthService, BridgeService } from '../../core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'lto-deposit-modal',
    templateUrl: './deposit-modal.component.html',
    styleUrls: ['./deposit-modal.component.scss'],
    standalone: false
})
export class DepositModalComponent implements OnInit {
  bridgeAddress = '';
  error = false;
  loaded = false;

  constructor(
    private auth: AuthService,
    private bridgeService: BridgeService,
    private snackbar: MatSnackBar
  ) {
    this.generateBridgeAddress();
  }

  ngOnInit() {}

  async generateBridgeAddress() {
    try {
      const wallet = await toPromise(this.auth.wallet$);
      if (!wallet) {
        throw new Error('You are not authenticated');
      }
      // this.bridgeAddress = await toPromise(this.bridgeService.depositTo(wallet.address));
      this.loaded = true;
    } catch (error) {
      this.error = true;
      this.snackbar.open('Unable generate bridge', 'Dismiss', { duration: 3000 });
    } finally {
      this.loaded = true;
    }
  }
}
