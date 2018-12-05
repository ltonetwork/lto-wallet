import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppbarModule, SidenavModule } from './components';

import { LtoPublicNodeService, BridgeService, EncoderService, WalletService } from './services';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [AppbarModule, SidenavModule],
  providers: [
    LtoPublicNodeService.provider,
    BridgeService.provider,
    EncoderService,
    WalletService.provider
  ]
})
export class CoreModule {}
