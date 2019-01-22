import { Component, Input, ElementRef, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'lto-page-content-body',
  template: '<ng-content></ng-content>',
  styles: [``]
})
export class PageContentBody implements OnInit, OnChanges {
  @Input() width: 'full' | 'normal' = 'normal';

  constructor(private _elementRef: ElementRef) {}

  ngOnInit() {
    this._setClass();
  }

  ngOnChanges() {
    this._setClass();
  }

  private _setClass() {
    this._elementRef.nativeElement.classList.add(this.width);
  }
}
