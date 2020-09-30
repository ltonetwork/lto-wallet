import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppbarModule, SidenavModule } from './components';

import {
  PublicNode,
  BridgeService,
  EncoderService,
  WalletService,
  AuthService,
  addresValidatorProvider,
  WavesService,
  Sidenav,
  wavesAddressValidatorProvider,
  ScriptsService,
} from './services';

import { ScriptsServiceImpl } from './services/scripts.service.impl';

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  exports: [AppbarModule, SidenavModule],
  providers: [
    PublicNode.provider,
    BridgeService.provider,
    EncoderService,
    WalletService.provider,
    AuthService.provider,
    addresValidatorProvider,
    wavesAddressValidatorProvider,
    WavesService.provider,
    Sidenav.provider,
    {
      provide: ScriptsService,
      useClass: ScriptsServiceImpl,
    },
  ],
})
export class CoreModule {}
