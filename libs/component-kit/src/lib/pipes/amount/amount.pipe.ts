import { Pipe, PipeTransform, Inject } from '@angular/core';
import { AMOUNT_DIVIDER } from './token';

@Pipe({
  name: 'lto_amount'
})
export class AmountPipe implements PipeTransform {
  constructor(@Inject(AMOUNT_DIVIDER) private _multiplayer: number) {}
  transform(value: number, args?: any): string {
    const result = value / this._multiplayer;

    if (result.toString().indexOf('e') !== -1) {
      return result.toFixed(8);
    } else {
      return result.toString();
    }
  }
}
