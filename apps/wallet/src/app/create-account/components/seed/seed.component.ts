import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-wallet-seed',
  template: `
    <span class="word" *ngFor="let word of words">{{ word }}</span>
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
  ]
})
export class SeedComponent {
  @Input()
  set seed(value: string[]) {
    this.words = this._addSpaces(value);
  }

  words: string[] = [];

  /**
   * To make user able to copy/paste text from screen we need to add spaces to
   * each word.
   */
  private _addSpaces(words: string[]): string[] {
    const lastIndex = words.length - 1;
    return words.map((word, index) => {
      return word + (index === lastIndex ? '' : ' ');
    });
  }
}
