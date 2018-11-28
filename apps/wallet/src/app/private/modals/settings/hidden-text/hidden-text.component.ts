import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-wallet-hidden-text',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['./hidden-text.component.scss']
})
export class HiddenTextComponent implements OnInit {
  @Input() hidden = true;

  constructor() {}

  ngOnInit() {}

  reveal() {
    this.hidden = false;
  }
}
