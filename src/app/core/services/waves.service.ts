import { ClassProvider, Injectable } from '@angular/core';

import { blake2b} from 'lto-api/raw/libs/blake2b';
import { keccak256} from 'lto-api/raw/libs/sha3';

import { EncoderService } from './encoder.service';


@Injectable()
export class WavesServiceImpl {
  constructor(private _encoderService: EncoderService) {}

  private blake2b(input: Uint8Array): Uint8Array {
    return blake2b(input, null, 32);
  }

  private keccak(input: Uint8Array): Array<number> {
    return (keccak256 as any).array(input);
  }

  private hashChain(input: Uint8Array): Array<number> {
    return this.keccak(this.blake2b(input));
  }

  isValidAddress(address: string): boolean {

    if (!address || typeof address !== 'string') {
      throw new Error('Missing or invalid address');
    }

    const addressBytes = this._encoderService.decode(address, 'base58');

    if (addressBytes[0] !== 1 || addressBytes[1] !== 'W'.charCodeAt(0)) {
      return false;
    }

    const key = addressBytes.slice(0, 22);
    const check = addressBytes.slice(22, 26);
    const keyHash = this.hashChain(key).slice(0, 4);

    for (let i = 0; i < 4; i++) {
      if (check[i] !== keyHash[i]) {
        return false;
      }
    }

    return true;
  }
}

export abstract class WavesService {
  static provider: ClassProvider = {
    provide: WavesService,
    useClass: WavesServiceImpl
  };

  abstract isValidAddress(address: string): boolean;
}
