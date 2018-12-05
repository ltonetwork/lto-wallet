import { NgModule } from '@angular/core';

import { MakeTransactionModalModule } from './make-transaction';
import { WithdrawModalModule } from './withdraw-modal';
import { DepositModalModule } from './deposit-modal';
import { StartLeaseModalModule } from './start-lease-modal';

@NgModule({
  imports: [
    MakeTransactionModalModule,
    WithdrawModalModule,
    DepositModalModule,
    StartLeaseModalModule
  ]
})
export class ModalsModule {}
