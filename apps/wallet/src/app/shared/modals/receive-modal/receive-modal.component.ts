import { Component, OnInit } from '@angular/core';
import { Wallet } from '../../../core';

@Component({
  selector: 'lto-wallet-receive-modal',
  templateUrl: './receive-modal.component.html',
  styleUrls: ['./receive-modal.component.scss']
})
export class ReceiveModalComponent implements OnInit {
  constructor(public wallet: Wallet) {}

  ngOnInit() {}
}
