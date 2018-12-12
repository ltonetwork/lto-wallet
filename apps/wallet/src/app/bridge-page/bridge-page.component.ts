import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BridgeDepositDialogComponent } from '../components/bridge-deposit-dialog/bridge-deposit-dialog.component';
import { BridgeWithdrawDialogComponent } from '../components/bridge-withdraw-dialog/bridge-withdraw-dialog.component';

@Component({
  selector: 'lto-wallet-bridge-page',
  templateUrl: './bridge-page.component.html',
  styleUrls: ['./bridge-page.component.scss']
})
export class BridgePageComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  deposit() {
    this.dialog.open(BridgeDepositDialogComponent);
  }

  withdraw() {
    this.dialog.open(BridgeWithdrawDialogComponent);
  }
}
