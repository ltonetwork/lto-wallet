import { Component, OnInit, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lto-wallet-hidden-text',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['./hidden-text.component.scss'],

  imports: [
    NgIf,
    FlexModule,
    MatRippleModule,
    MatIconModule,
  ]
})
export class HiddenTextComponent implements OnInit {
  @Input() label = '';

  @Input() text = '';

  get visibleText(): string {
    if (this.visible) {
      return this.text;
    }

    return '*****************************';
  }

  visible = false;

  constructor() {}

  ngOnInit() {}

  show() {
    this.visible = true;
  }
}
