import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BridgeDepositDialogComponent } from '../components/bridge-deposit-dialog/bridge-deposit-dialog.component';
import { BridgeWithdrawDialogComponent } from '../components/bridge-withdraw-dialog/bridge-withdraw-dialog.component';
import { BRIDGE_ENABLED } from '../tokens';

@Component({
  selector: 'lto-wallet-bridge-page',
  templateUrl: './bridge-page.component.html',
  styleUrls: ['./bridge-page.component.scss']
})
export class BridgePageComponent implements OnInit {
  get disabled(): boolean {
    return !this.isEnabled;
  }
  constructor(private dialog: MatDialog, @Inject(BRIDGE_ENABLED) public isEnabled: boolean) {}

  ngOnInit() {}

  deposit() {
    this.dialog.open(BridgeDepositDialogComponent);
  }

  withdraw() {
    this.dialog.open(BridgeWithdrawDialogComponent);
  }
}
