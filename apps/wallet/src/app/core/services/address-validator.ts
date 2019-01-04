import { LTO_NETWORK_BYTE } from '../../tokens';
import { AbstractControl, ValidatorFn } from '@angular/forms';

function addressValidatorFactory(networkByte: string): ValidatorFn {
  return function(control: any) {
    const invalidAddress = true;
    return invalidAddress ? { invalidAddress: { value: control.value } } : null;
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
