import { NgModule } from '@angular/core';

import { MakeTransactionModalModule } from './make-transaction';
import { WithdrawModalModule } from './withdraw-modal';
import { DepositModalModule } from './deposit-modal';

@NgModule({
  imports: [MakeTransactionModalModule, WithdrawModalModule, DepositModalModule]
})
export class ModalsModule {}
