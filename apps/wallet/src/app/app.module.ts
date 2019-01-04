import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { SharedModule } from './shared';

import { CoreModule } from './core/core.module';
import {
  LTO_NETWORK_BYTE,
  LTO_PUBLIC_API,
  AMOUNT_DIVIDER,
  LTO_BRIDGE_HOST,
  DEFAUTL_TRANSFER_FEE,
  ANCHOR_FEE,
  BRIDGE_ENABLED
} from './tokens';
import { ModalsModule } from './modals/modals.module';
import { BridgePageComponent } from './bridge-page/bridge-page.component';
import { WalletComponentsModule } from './components/wallet-components.module';
import { LeasingComponent } from './leasing/leasing.component';
import { SettingsPageComponent, SigninComponent } from './pages';

@NgModule({
  declarations: [
    AppComponent,
    BridgePageComponent,
    SigninComponent,
    LeasingComponent,
    SettingsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    ModalsModule,
    RecaptchaModule.forRoot(),
    WalletComponentsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LdsIDYUAAAAAPImboJcK6idKlzFXlW_bPFa7mTu'
      }
    },
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
      provide: DEFAUTL_TRANSFER_FEE,
      useValue: 100000
    },
    {
      provide: ANCHOR_FEE,
      useValue: 100000
    },
    {
      provide: BRIDGE_ENABLED,
      useValue: false
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
