import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lto-wallet-hidden-text',
    templateUrl: './hidden-text.component.html',
    styleUrls: ['./hidden-text.component.scss'],
    standalone: false
})
export class HiddenTextComponent implements OnInit {
  @Input() label: string = '';

  @Input() text: string = '';

  get visibleText(): string {
    if (this.visible) {
      return this.text;
    }

    return '*****************************';
  }

  visible: boolean = false;

  constructor() {}

  ngOnInit() {}

  show() {
    this.visible = true;
  }
}
