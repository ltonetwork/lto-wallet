import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';

import { BridgeRoutingModule } from './bridge-routing.module';
import { BridgeComponent } from './bridge.component';
import { BridgeSwapModule } from './components/bridge-swap/bridge-swap.module';

@NgModule({
  declarations: [BridgeComponent],
  imports: [SharedModule, BridgeRoutingModule, BridgeSwapModule]
})
export class BridgeModule {}
