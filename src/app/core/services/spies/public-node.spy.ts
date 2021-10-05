import { of } from 'rxjs';
import { PublicNodeService } from '@app/core';

const PublicNodeServiceSpy: jasmine.SpyObj<PublicNodeService> = jasmine.createSpyObj<PublicNodeService>(
  'PublicNodeService',
  ['version', 'height', 'lastBlocks', 'headerSequence', 'transaction', 'block', 'transactionsOf', 'indexedTransactions', 'balanceOf', 'unconfirmedTransactions' ,'activeLease',  'getScript', 'compileScript']
);

PublicNodeServiceSpy.version.and.returnValue(of('1.0.0'));
PublicNodeServiceSpy.height.and.returnValue(of(777));
PublicNodeServiceSpy.lastBlocks.and.returnValue(of([]));
PublicNodeServiceSpy.headerSequence.and.returnValue(of([]));
PublicNodeServiceSpy.transaction.and.returnValue(of(null));
PublicNodeServiceSpy.block.and.returnValue(of(null));
PublicNodeServiceSpy.transactionsOf.and.returnValue(of([]));
PublicNodeServiceSpy.indexedTransactions.and.returnValue(of({ total: 0, items: [] }));
PublicNodeServiceSpy.balanceOf.and.returnValue(of(null));
PublicNodeServiceSpy.unconfirmedTransactions.and.returnValue(of([]));
PublicNodeServiceSpy.activeLease.and.returnValue(of([]));
PublicNodeServiceSpy.getScript.and.returnValue(of({}));
PublicNodeServiceSpy.compileScript.and.returnValue(of(null as any));

export function createPublicNodeServiceSpy() {
  return { provide: PublicNodeService, useValue: PublicNodeServiceSpy };
}

