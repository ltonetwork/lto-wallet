import { Pipe, PipeTransform } from '@angular/core';
import { TransactionTypes } from '@app/core';

@Pipe({
    name: 'typeLabel',
    standalone: false
})
export class TypeLabelPipe implements PipeTransform {
  transform(type: TransactionTypes, args?: any): string {
    switch (type) {
      case TransactionTypes.TRANSFER:
        return 'Transfer';
      case TransactionTypes.LEASING:
        return 'Leasing';
      case TransactionTypes.CANCEL_LEASING:
        return 'Cancel leasing';
      case TransactionTypes.MASS_TRANSFER:
        return 'Mass transfer';
      case TransactionTypes.ANCHOR:
        return 'Anchor';
    }

    // In case we have wierd transaction type which we never see before
    return (type as any).toString();
  }
}
