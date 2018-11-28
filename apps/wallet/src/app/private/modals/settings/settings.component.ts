import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Account } from 'lto-api';

@Component({
  selector: 'lto-wallet-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public wallet: Account) {}

  ngOnInit() {}
}
