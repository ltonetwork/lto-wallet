import { Component, OnInit } from '@angular/core';
import { toPromise } from '../../core/utils';
import { AuthService, LtoPublicNodeService } from '../../core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lto-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss']
})
export class DepositModalComponent implements OnInit {
  bridgeAddress = '';
  error = false;
  loaded = false;

  constructor(
    private auth: AuthService,
    private publicNode: LtoPublicNodeService,
    private snackbar: MatSnackBar
  ) {
    this.generateBridgeAddress();
  }

  ngOnInit() {}

  async generateBridgeAddress() {
    try {
      this.bridgeAddress = await toPromise(
        this.publicNode.bridge('LTO20', 'LTO', this.auth.wallet.address)
      );
      this.loaded = true;
    } catch (error) {
      this.error = true;
      this.snackbar.open('Unable generate bridge', 'Dismiss', { duration: 3000 });
    } finally {
      this.loaded = true;
    }
  }
}
