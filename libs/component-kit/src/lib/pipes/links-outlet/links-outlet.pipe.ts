import { Pipe, PipeTransform, Inject, Optional } from '@angular/core';
import { LINKS_OUTLET_NAME } from './tokens';

@Pipe({
  name: 'ltoLinksOutlet'
})
export class LinksOutletPipe implements PipeTransform {
  constructor(
    @Inject(LINKS_OUTLET_NAME)
    @Optional()
    private _outletName: string
  ) {}

  transform(value: any[], args?: any): any {
    if (this._outletName) {
      // If we provide outlet name use it
      return [
        '/',
        {
          outlets: {
            [this._outletName]: value.slice(1)
          }
        }
      ];
    }

    return value;
  }
}
