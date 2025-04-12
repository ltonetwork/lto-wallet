import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

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
  LedgerService,
} from './services';

import { ScriptsServiceImpl } from './services/scripts.service.impl';

@NgModule({ declarations: [],
    exports: [AppbarModule, SidenavModule], imports: [MatDialogModule], providers: [
        PublicNode.provider,
        BridgeService.provider,
        EncoderService,
        WalletService.provider,
        AuthService.provider,
        addresValidatorProvider,
        wavesAddressValidatorProvider,
        WavesService.provider,
        Sidenav.provider,
        LedgerService.provider,
        {
            provide: ScriptsService,
            useClass: ScriptsServiceImpl,
        },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class CoreModule {}
