import { LTO_NETWORK_BYTE } from '../../tokens';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { LTO } from 'lto-api';

function addressValidatorFactory(networkByte: string): ValidatorFn {
  return function(control: any) {
    const value = control.value;
    let isValid = true;

    if (value) {
      const lto = new LTO(networkByte);
      isValid = lto.isValidAddress(control.value);
    }

    return isValid ? null : { invalidAddress: { value: control.value } };
  };
}

export function AddressValidator(control: AbstractControl) {
  // This is just an injection token. Look for real validator in the addressValidatorFactory
}

AddressValidator.provider = {
  provide: AddressValidator,
  useFactory: addressValidatorFactory,
  deps: [LTO_NETWORK_BYTE]
};
