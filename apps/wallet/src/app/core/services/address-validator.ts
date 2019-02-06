import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '../../tokens';
import { ValidatorFn } from '@angular/forms';
import { LTO } from 'lto-api';
import { FactoryProvider, InjectionToken } from '@angular/core';
import { WalletService } from './wallet.service';
import { WavesService } from './waves.service';

export function addressValidatorFactory(networkByte: string, publicApi: string): ValidatorFn {
  return function(control: any) {
    const value = control.value;
    let isValid = true;

    if (value) {
      const nodeAddress = publicApi.replace(/\/$/, '');
      const lto = new LTO(networkByte, nodeAddress);
      isValid = lto.isValidAddress(control.value);
    }

    return isValid ? null : { invalidAddress: { value: control.value } };
  };
}

export function wavesAddressValidatorFactory(wavesService: WavesService): ValidatorFn {
  return function(control: any) {
    const value = control.value;
    let isValid = true;

    if (value) {
      isValid = wavesService.isValidAddress(value);
    }

    return isValid ? null : { invalidAddress: { value } };
  };
}

export const ADDRESS_VALIDATOR = new InjectionToken('ADDRESS_VALIDATOR');
export const WAVES_ADDRESS_VALIDATOR = new InjectionToken('WAVES_ADDRESS_VALIDATOR');

export const addresValidatorProvider: FactoryProvider = {
  provide: ADDRESS_VALIDATOR,
  useFactory: addressValidatorFactory,
  deps: [LTO_NETWORK_BYTE, LTO_PUBLIC_API]
};

export const wavesAddressValidatorProvider: FactoryProvider = {
  provide: WAVES_ADDRESS_VALIDATOR,
  useFactory: wavesAddressValidatorFactory,
  deps: [WavesService]
};
