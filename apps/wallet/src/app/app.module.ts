import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecaptchaModule, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { SharedModule } from './shared';
import { BREAKPOINT, DEFAULT_BREAKPOINTS } from '@angular/flex-layout';

import { CoreModule } from './core/core.module';
import {
  LTO_NETWORK_BYTE,
  LTO_PUBLIC_API,
  AMOUNT_DIVIDER,
  LTO_BRIDGE_HOST,
  DEFAULT_TRANSFER_FEE,
  ANCHOR_FEE,
  BRIDGE_ENABLED,
  SWAP_PAGE_ENABLED
} from './tokens';
import { ModalsModule } from './modals/modals.module';
import { WalletComponentsModule } from './components/wallet-components.module';
import { LeasingComponent } from './leasing/leasing.component';
import { SettingsPageComponent, SigninComponent } from './pages';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, SigninComponent, LeasingComponent, SettingsPageComponent],
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
      provide: BREAKPOINT,
      useValue: [
        {
          alias: 'md',
          suffix: 'Md',
          mediaQuery: 'screen and (min-width: 960px) and (max-width: 1499px)',
          overlapping: false
        },
        {
          alias: 'lg',
          suffix: 'Lg',
          mediaQuery: 'screen and (min-width: 1500px) and (max-width: 1919px)',
          overlapping: false
        },
        {
          alias: 'gt-md',
          suffix: 'GtMd',
          mediaQuery: 'screen and (min-width: 1500px)',
          overlapping: false
        },
        {
          alias: 'lt-lg',
          suffix: 'LtLg',
          mediaQuery: 'screen and (max-width: 1499px)',
          overlapping: false
        }
      ],
      multi: true
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: '6LebrZMUAAAAAEhsMU6H0QQChao1Ya3buSsBXunu'
      }
    },
    {
      provide: LTO_NETWORK_BYTE,
      useValue: environment.networkByte
    },
    {
      provide: LTO_PUBLIC_API,
      useValue: environment.lto_api_url
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
      provide: DEFAULT_TRANSFER_FEE,
      useValue: environment.transfer_fee
    },
    {
      provide: ANCHOR_FEE,
      useValue: environment.anchor_fee
    },
    {
      provide: BRIDGE_ENABLED,
      useValue: environment.bridge
    },
    {
      provide: SWAP_PAGE_ENABLED,
      useValue: environment.swapPageEnabled
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {}
