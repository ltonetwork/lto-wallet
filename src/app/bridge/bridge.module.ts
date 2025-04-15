import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { BridgeComponent } from './bridge.component';
import { BridgeSwapModule } from './bridge-swap/bridge-swap.module';
import { RouterModule, Routes } from '@angular/router';
import { BridgeDepositDialogComponent } from './components/bridge-deposit-dialog/bridge-deposit-dialog.component';
import { BridgeWithdrawDialogComponent } from './components/bridge-withdraw-dialog/bridge-withdraw-dialog.component';
import { ContentSectionComponent } from '@app/shared/components';

const routes: Routes = [
  {
    path: '',
    component: BridgeComponent
  }
];

@NgModule({
  declarations: [
    BridgeComponent,
    BridgeDepositDialogComponent,
    BridgeWithdrawDialogComponent,
  ],
  imports: [SharedModule, RouterModule.forChild(routes), BridgeSwapModule, ContentSectionComponent]
})
export class BridgeModule {}
