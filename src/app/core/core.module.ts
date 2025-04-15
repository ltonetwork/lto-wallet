import { NgModule } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {
  PublicNode,
  BridgeService,
  EncoderService,
  WalletService,
  AuthService,
  addresValidatorProvider,
  Sidenav,
  ScriptsService,
  LedgerService,
} from './services';

@NgModule({
  providers: [
    PublicNode,
    BridgeService,
    EncoderService,
    WalletService,
    AuthService,
    addresValidatorProvider,
    Sidenav,
    LedgerService,
    ScriptsService,
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class CoreModule {}
