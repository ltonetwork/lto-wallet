import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared';
import { LTO_NETWORK_BYTE, LTO_PUBLIC_API, AMOUNT_DIVIDER, LTO_BRIDGE_HOST } from './tokens';

import {
  StartLeaseModalModule,
  MakeTransactionModalModule,
  DepositModalModule,
  WithdrawModalModule,
  BackupAccountModalModule
} from './modals';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    StartLeaseModalModule,
    MakeTransactionModalModule,
    DepositModalModule,
    WithdrawModalModule,
    BackupAccountModalModule,
    SharedModule
  ],
  providers: [
    {
      provide: LTO_NETWORK_BYTE,
      useValue: 'T'
    },
    {
      provide: LTO_PUBLIC_API,
      // useValue: 'https://nodes.wavesnodes.com/'
      // useValue: 'https://testnet.legalthings.one/'
      useValue: 'https://testnet.lto.network/'
    },
    {
      provide: AMOUNT_DIVIDER,
      useValue: 100000000
    },
    {
      provide: LTO_BRIDGE_HOST,
      useValue: 'https://bridge.lto.network'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
