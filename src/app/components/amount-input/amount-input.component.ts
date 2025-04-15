import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'lto-wallet-amount-input',
  templateUrl: './amount-input.component.html',
  styleUrls: ['./amount-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AmountInputComponent)
    }
  ],
  imports: [
    NgClass
  ]
})
export class AmountInputComponent implements OnInit, ControlValueAccessor {
  @Input()
  disabled = false;

  get value(): any {
    return this._value;
  }

  set value(v: any) {
    this._value = v;
    if (this.changeCb) {
      this.changeCb(this._value);
    }
  }

  get invalid(): boolean {
    return this._invalid;
  }

  private _value: any = '';
  private _invalid = false;

  private changeCb: Function | null = null;

  constructor() {}

  ngOnInit() {}

  valueChange(event: any) {
    const input = event.target;
    const newValue = parseFloat(input.value);
    this._invalid = input.value && isNaN(newValue);

    this.value = input.value;
  }

  /**
   * ControlValueAccessor
   */

  registerOnChange(cb: Function) {
    this.changeCb = cb;
  }

  registerOnTouched(cb: Function) {}

  writeValue(value: any) {
    this.value = value;
  }
}
