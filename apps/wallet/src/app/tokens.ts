import { InjectionToken } from '@angular/core';

export const LTO_NETWORK_BYTE = new InjectionToken<'T' | 'L'>('LTO_NETWORK_BYTE');

/**
 * Public node utl
 */
export const LTO_PUBLIC_API = new InjectionToken<string>('LTO_PUBLIC_API');

/**
 * Transaction ammount and fees stored as plain number in transaction
 * To make user-consumable value we need to dive it by speciffic ammout
 */
export const AMOUNT_DIVIDER = new InjectionToken<number>('AMOUNT_DIVIDER');

export const LTO_BRIDGE_HOST = new InjectionToken<string>('LTO_BRIDGE_API');

export const TRANSFER_FEE = new InjectionToken<number>('TRANSFER_FEE');
export const ANCHOR_FEE = new InjectionToken<number>('ANCHOR_FEE');

/**
 * Bridget service works on mainnet only. Based on this token
 * BridgetService factory will decide which version of BridgeService to use
 */
export const BRIDGE_ENABLED = new InjectionToken<boolean>('BRIDGE_ENABLED');
