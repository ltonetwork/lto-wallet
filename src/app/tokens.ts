import { InjectionToken } from '@angular/core';

export const LTO_NETWORK_BYTE = new InjectionToken<'T' | 'L'>('LTO_NETWORK_BYTE');

/**
 * Public node utl
 */
export const LTO_PUBLIC_API = new InjectionToken<string>('LTO_PUBLIC_API');
export const LTO_MOBILE_AUTH = new InjectionToken<{ws: string, url: string}>('LTO_MOBILE_AUTH');

/**
 * Transaction ammount and fees stored as plain number in transaction
 * To make user-consumable value we need to dive it by speciffic ammout
 */
export const AMOUNT_DIVIDER = new InjectionToken<number>('AMOUNT_DIVIDER');

export const LTO_BRIDGE_HOST = new InjectionToken<string>('LTO_BRIDGE_API');

export const DEFAULT_TRANSFER_FEE = new InjectionToken<number>('DEFAUTL_TRANSFER_FEE');
export const MASS_TRANSFER_FEE = new InjectionToken<number>('MASS_TRANSFER_FEE');
export const ANCHOR_FEE = new InjectionToken<number>('ANCHOR_FEE');
export const SET_SCRIPT_FEE = new InjectionToken<number>('SET_SCRIPT_FEE');

/**
 * Bridget service works on mainnet only. Based on this token
 * BridgetService factory will decide which version of BridgeService to use
 */
export const BRIDGE_ENABLED = new InjectionToken<boolean>('BRIDGE_ENABLED');
export const SWAP_PAGE_ENABLED = new InjectionToken<boolean>('SWAP_PAGE_ENABLED');
