import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lto-wallet-hidden-text',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['./hidden-text.component.scss']
})
export class HiddenTextComponent implements OnInit {
  hidden = true;

  constructor() {}

  ngOnInit() {}

  reveal() {
    this.hidden = false;
  }
}
