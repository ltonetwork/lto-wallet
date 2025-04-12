import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwapDialogComponent } from './components/swap-dialog/swap-dialog.component';

@Component({
    selector: 'lto-wallet-token-swap',
    templateUrl: './token-swap.component.html',
    styleUrls: ['./token-swap.component.scss'],
    standalone: false
})
export class TokenSwapComponent implements OnInit {
  constructor(private _matDialog: MatDialog) {}

  ngOnInit() {}

  showSwapDialog() {
    this._matDialog.open(SwapDialogComponent);
  }
}
