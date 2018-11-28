import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Account } from 'lto-api';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'lto-wallet-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public ltoWallet: Account, private snackbar: MatSnackBar) {}

  ngOnInit() {}

  copyToClipboard() {
    const input = document.createElement('input');
    input.style.position = 'absolute';
    input.style.bottom = '-1000px';
    document.body.appendChild(input);
    input.value = this.ltoWallet.address;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    this.snackbar.open('Address is copied', 'Dismiss', { duration: 3000 });
  }
}
