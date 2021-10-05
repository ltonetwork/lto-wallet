import { of } from 'rxjs';
import { BridgeService } from '@app/core';

const BridgeServiceSpy: jasmine.SpyObj<BridgeService> = jasmine.createSpyObj<BridgeService>(
  'BridgeService',
  ['faucet', 'depositTo', 'withdrawTo'],
  {
    burnRate$: of(1),
    burnedTokens$: of(1),
    burnFees$: of({ lto: 1, lto20: 1, binance: 1 }),
  }
);

BridgeServiceSpy.faucet.and.returnValue(of(null));
BridgeServiceSpy.depositTo.and.returnValue(of('test_deposit_address'));
BridgeServiceSpy.withdrawTo.and.returnValue(of('test_withdraw_address'));

export function createBridgeServiceSpy() {
  return { provide: BridgeService, useValue: BridgeServiceSpy };
}
