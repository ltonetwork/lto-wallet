import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface ISearchValue {
  type: 'block' | 'address' | 'transaction';
  value: string;
}

@Component({
  selector: 'poe-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output()
  search = new EventEmitter<ISearchValue | null>();

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
    let result: ISearchValue | null = null;
    value = value.trim();

    if (/^\d+$/.test(value)) {
      result = { type: 'block', value };
    } else if (value.toUpperCase().startsWith('3P') && value.length === 35) {
      result = { type: 'address', value };
    } else if (value.length === 44) {
      result = { type: 'transaction', value };
    } else {
      console.log('Invalid id');
    }

    this.search.next(result);
  }
}
