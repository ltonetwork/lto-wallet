import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AMOUNT_DIVIDER, ANCHOR_FEE } from '../../tokens';

@Component({
  selector: 'lto-wallet-fee-input-modal',
  templateUrl: './fee-input-modal.component.html',
  styleUrls: ['./fee-input-modal.component.scss']
})
export class FeeInputModalComponent implements OnInit {
  fee: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public hash: string,
    @Inject(AMOUNT_DIVIDER) private divider: number,
    @Inject(ANCHOR_FEE) private defaultFee: number
  ) {
    this.fee = defaultFee / divider;
  }

  ngOnInit() {}
}
