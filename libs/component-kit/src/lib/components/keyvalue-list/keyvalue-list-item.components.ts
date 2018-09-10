import { Component, Input } from '@angular/core';

@Component({
  selector: 'lto-keyvalue-list-item',
  template: `
    <div class="keyvalue-list-item" fxLayout="column" fxLayout.gt-md="row">
      <div class="keyvalue-list-key" fxFlex="1 1 auto">{{label}}</div>
      <div class="keyvalue-list-value"><ng-content></ng-content></div>
    </div>
  `,
  styles: [
    `
      .keyvalue-list-item {
        padding: 8px 8px;
        font-size: 18px;
      }

      .keyvalue-list-key {
        color: rgba(0, 0, 0, 0.82);
        // flex: 1 1 auto;
      }
      .keyvalue-list-value {
        color: rgba(0, 0, 0, 0.52);
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `
  ]
})
export class KeyvalueListItemComponent {
  @Input()
  label: string = '';
}
