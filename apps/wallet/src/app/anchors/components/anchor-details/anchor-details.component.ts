import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lto-wallet-anchor-details',
  templateUrl: './anchor-details.component.html',
  styleUrls: ['./anchor-details.component.scss']
})
export class AnchorDetailsComponent implements OnInit {
  selectedAnchorTpe: 'hex' | 'base64' | 'base58' = 'hex';

  constructor() {}

  ngOnInit() {}

  selectAnchorType(type: 'base64' | 'base58' | 'hex') {
    this.selectedAnchorTpe = type;
  }
}
