import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';

@Injectable()
export class EncoderService {
  private alphabet: string;
  private alphabetMap: Record<string, number>;

  constructor() {
    this.alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    this.alphabetMap = this.alphabet.split('').reduce(
      (map, c, i) => {
        map[c] = i;
        return map;
      },
      {} as any
    );
  }

  base64Encode(buffer: any) {
    return Buffer.from(String.fromCharCode.apply(null, buffer), 'binary').toString('base64');
  }

  hexEncode(buffer: any) {
    return Buffer.from(String.fromCharCode.apply(null, buffer), 'binary').toString('hex');
  }

  decode(hash: string, encoding: string) {
    let hashBytes;
    switch (encoding) {
      case 'base64':
        hashBytes = this.base64Decode(hash);
        break;

      case 'base58':
        hashBytes = this.base58Decode(hash);
        break;

      case 'hex':
        hashBytes = this.hexDecode(hash);
        break;
    }

    if (!hashBytes) {
      throw new Error('Uncnown encoding: ' + encoding);
    }

    return hashBytes;
  }

  validateSHA256(hash: string, encoding: string) {
    const hashBytes = this.decode(hash, encoding);
    return hashBytes.length === 32;
  }

  base64Decode(hash: string) {
    const bytes = Buffer.from(hash, 'base64').toString('binary');
    return new Uint8Array(bytes.split('').map(c => c.charCodeAt(0)));
  }

  base58Decode(hash: string) {
    if (!hash.length) return new Uint8Array(0);

    const bytes = [0];

       for (let i = 0; i < hash.length; i++) {
      const c = hash[i];
      if (!(c in this.alphabetMap)) {
        throw new Error(`hash-encoder: there is no character "${c}" in the base58 sequence`);
      }

      for (let j = 0; j < bytes.length; j++) {
        bytes[j] *= 58;
      }

      bytes[0] += this.alphabetMap[c];
      let carry = 0;

      for (let j = 0; j < bytes.length; j++) {
        bytes[j] += carry;
               carry = bytes[j] >> 8;
               bytes[j] &= 0xff;
      }

      while (carry) {
               bytes.push(carry & 0xff);
               carry >>= 8;
      }
    }

    for (let i = 0; hash[i] === '1' && i < hash.length - 1; i++) {
      bytes.push(0);
    }

    return new Uint8Array(bytes.reverse());
  }

  base58Encode(buffer: any): string {
    if (!buffer.length) return '';

    const digits = [0];

    for (let i = 0; i < buffer.length; i++) {
      for (let j = 0; j < digits.length; j++) {
        digits[j] <<= 8;
      }

      digits[0] += buffer[i];
      let carry = 0;

      for (let k = 0; k < digits.length; k++) {
        digits[k] += carry;
        carry = (digits[k] / 58) | 0;
        digits[k] %= 58;
      }

      while (carry) {
        digits.push(carry % 58);
        carry = (carry / 58) | 0;
      }
    }

    for (let i = 0; buffer[i] === 0 && i < buffer.length - 1; i++) {
      digits.push(0);
    }

    return digits
      .reverse()
      .map(digit => {
        return this.alphabet[digit];
      })
      .join('');
  }

  hexDecode(hash: string) {
    const bytes = Buffer.from(hash, 'hex').toString('binary');
    return new Uint8Array(bytes.split('').map(c => c.charCodeAt(0)));
  }
}
