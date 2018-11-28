import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Account } from 'lto-api';

@Component({
  selector: 'lto-wallet-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public ltoWallet: Account) {}

  ngOnInit() {}
}
