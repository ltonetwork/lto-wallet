import { NgModule } from '@angular/core';

import { MakeTransactionModalModule } from './make-transaction';
import { WithdrawModalModule } from './withdraw-modal';
import { DepositModalModule } from './deposit-modal';
import { StartLeaseModalModule } from './start-lease-modal';
import { FeeInputModalModule } from './fee-input-modal';
import { CreateScriptModule } from './create-script';
import { ScriptInfoModalModule } from './script-info-modal';
import { DisableScriptModule } from './disable-script';

@NgModule({
  imports: [
    MakeTransactionModalModule,
    WithdrawModalModule,
    DepositModalModule,
    StartLeaseModalModule,
    FeeInputModalModule,
    CreateScriptModule,
    ScriptInfoModalModule,
    DisableScriptModule
  ]
})
export class ModalsModule {}
