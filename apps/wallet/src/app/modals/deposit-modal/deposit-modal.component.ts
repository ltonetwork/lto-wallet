import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core';

@Component({
  selector: 'lto-deposit-modal',
  templateUrl: './deposit-modal.component.html',
  styleUrls: ['./deposit-modal.component.scss']
})
export class DepositModalComponent implements OnInit {
  address: string;

  constructor(auth: AuthService) {
    this.address = auth.wallet.address;
  }

  ngOnInit() {}
}
