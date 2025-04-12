import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lto-wallet-seed',
    template: `
    <span class="word" *ngFor="let word of words; last as isLast">{{ word }}<ng-container *ngIf="!isLast">&nbsp;</ng-container></span>
  `,
    styles: [
        `
      :host {
        display: block;
        padding: 16px;
        border: 1px solid #ebebeb;
        border-radius: 8px;
        background: rgba(0, 0, 0, 0.02);
        border: 1px solid rgba(0, 0, 0, 0.12);
      }

      .word {
        display: inline-block;
        margin: 8px;
      }
    `
    ],
    standalone: false
})
export class SeedComponent {
  @Input()
  set seed(value: string[]) {
    this.words = value;
  }

  words: string[] = [];
}
