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
import { AmountDividePipeModule, TypeLabelPipeModule } from './pipes';

@NgModule({
  declarations: [],
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
  exports: [
    AmountDividePipeModule,
    TypeLabelPipeModule,
  ]
})
export class CoreModule {}
