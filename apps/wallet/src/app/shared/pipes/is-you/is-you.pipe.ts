import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../../core';

/**
 * Replacec address with 'You'
 */
@Pipe({
  name: 'isYou'
})
export class IsYouPipe implements PipeTransform {
  constructor(private auth: AuthService) {}

  transform(value: any, args?: any): any {
    return value === this.auth.wallet.address ? 'You' : value;
  }
}
