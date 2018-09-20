import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'poe-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output()
  search = new EventEmitter<string>();

  @Input()
  placeholder: string = '';

  focused = false;
  inputValue = '';

  get isActive(): boolean {
    return this.focused || !!this.inputValue;
  }

  constructor() {}

  ngOnInit() {}

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }

  searchSubmit(value: string) {
    this.search.next(value.trim());
  }
}
