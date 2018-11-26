import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService, MyWallet, ScreenService, BridgeService } from './services';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, FlexLayoutModule],
  providers: [
    AuthService.provider,
    MyWallet.provider,
    ScreenService.provider,
    BridgeService.provider
  ]
})
export class CoreModule {}
