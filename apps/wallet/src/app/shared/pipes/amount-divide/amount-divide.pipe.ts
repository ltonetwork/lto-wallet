import { Pipe, PipeTransform, Inject } from '@angular/core';
import { AMOUNT_DIVIDER } from '../../../tokens';

@Pipe({
  name: 'amountDivide'
})
export class AmountDividePipe implements PipeTransform {
  constructor(@Inject(AMOUNT_DIVIDER) private divider: number) {}
  transform(value: any, args?: any): any {
    return value / this.divider;
  }
}
