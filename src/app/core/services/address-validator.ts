import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@app/tokens';
import { ValidatorFn } from '@angular/forms';
import LTO from '@ltonetwork/lto';
import { FactoryProvider, InjectionToken } from '@angular/core';

export function addressValidatorFactory(networkByte: string, publicApi: string): ValidatorFn {
  return function(control: any) {
    const value = control.value;
    let isValid = true;

    if (value) {
      const lto = new LTO(networkByte);
      lto.nodeAddress = publicApi.replace(/\/$/, '');
      isValid = lto.isValidAddress(control.value);
    }

    return isValid ? null : { invalidAddress: { value: control.value } };
  };
}

export const ADDRESS_VALIDATOR = new InjectionToken('ADDRESS_VALIDATOR');

export const addresValidatorProvider: FactoryProvider = {
  provide: ADDRESS_VALIDATOR,
  useFactory: addressValidatorFactory,
  deps: [LTO_NETWORK_BYTE, LTO_PUBLIC_API]
};
