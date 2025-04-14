import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { BridgeComponent } from './bridge.component';
import { BridgeSwapModule } from './bridge-swap/bridge-swap.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BridgeComponent
  }
];

@NgModule({
  declarations: [BridgeComponent],
  imports: [SharedModule, RouterModule.forChild(routes), BridgeSwapModule]
})
export class BridgeModule {}
