import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared';

import { CoreModule } from './core/core.module';
import {
  LTO_NETWORK_BYTE,
  LTO_PUBLIC_API,
  AMOUNT_DIVIDER,
  LTO_BRIDGE_HOST,
  TRANSFER_FEE,
  ANCHOR_FEE
} from './tokens';
import { ModalsModule } from './modals/modals.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ModalsModule
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
    },
    {
      provide: TRANSFER_FEE,
      useValue: 100000
    },
    {
      provide: ANCHOR_FEE,
      useValue: 100000
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
