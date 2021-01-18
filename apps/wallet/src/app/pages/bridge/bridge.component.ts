import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BridgeSwapComponent } from './bridge-swap';

@Component({
  selector: 'lto-wallet-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.scss'],
})
export class BridgeComponent implements OnInit {
  constructor(private _matDialog: MatDialog) { }

  ngOnInit() { }

  showSwpaDialog() {
    const dialog = this._matDialog.open(BridgeSwapComponent);
  }
}
