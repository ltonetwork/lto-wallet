import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AuthService, ScreenService, BridgeService, LtoPublicNodeService } from './services';

@NgModule({
  declarations: [],
  imports: [HttpClientModule, FlexLayoutModule],
  providers: [
    AuthService.provider,
    ScreenService.provider,
    BridgeService.provider,
    LtoPublicNodeService.provider
  ]
})
export class CoreModule {}
