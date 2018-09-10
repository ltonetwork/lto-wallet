import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lto_typeLabel'
})
export class TypeLabelPipe implements PipeTransform {
  transform(type: number, args?: any): string {
    switch (type) {
      case 4:
        return 'Transaction';
      case 8:
        return 'Leasing';
      case 9:
        return 'Cancel leasing';
      case 12:
        return 'Anchor';
    }

    return type.toString();
  }
}
