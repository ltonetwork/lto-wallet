import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { SharedModule } from './shared';
import { BREAKPOINT } from '@angular/flex-layout';

import { CoreModule } from './core/core.module';
import {
  LTO_NETWORK_BYTE,
  LTO_PUBLIC_API,
  AMOUNT_DIVIDER,
  LTO_BRIDGE_HOST,
  DEFAULT_TRANSFER_FEE,
  MASS_TRANSFER_FEE,
  ANCHOR_FEE,
  SET_SCRIPT_FEE,
  BRIDGE_ENABLED,
  BRIDGE_BSC_ENABLED,
  SWAP_PAGE_ENABLED,
  LTO_MOBILE_AUTH, BRIDGE_BEP2_ENABLED, WALLETCONNECT_PROJECT_ID, BRIDGE_EQTY_ENABLED
} from './tokens';

import { environment } from '../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { SidenavComponent, AppbarComponent } from '@app/components';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    SidenavComponent,
    AppbarComponent
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
        siteKey: environment.recaptcha_site_key
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
      provide: LTO_MOBILE_AUTH,
      useValue: environment.mobile_auth
    },
    {
      provide: AMOUNT_DIVIDER,
      useValue: 100000000
    },
    {
      provide: LTO_BRIDGE_HOST,
      useValue: environment.bridge_url
    },
    {
      provide: DEFAULT_TRANSFER_FEE,
      useValue: environment.transfer_fee
    },
    {
      provide: MASS_TRANSFER_FEE,
      useValue: environment.mass_transfer_fee
    },
    {
      provide: ANCHOR_FEE,
      useValue: environment.anchor_fee
    },
    {
      provide: SET_SCRIPT_FEE,
      useValue: environment.set_script_fee
    },
    {
      provide: BRIDGE_ENABLED,
      useValue: environment.bridge
    },
    {
      provide: BRIDGE_BSC_ENABLED,
      useValue: true
    },
    {
      provide: BRIDGE_BEP2_ENABLED,
      useValue: false
    },
    {
      provide: BRIDGE_EQTY_ENABLED,
      useValue: environment.networkByte === 'T' || (Date.now() >= Date.UTC(new Date().getUTCFullYear(), 8, 1) && Date.now() < Date.UTC(new Date().getUTCFullYear(), 10, 1))
    },
    {
      provide: SWAP_PAGE_ENABLED,
      useValue: environment.swapPageEnabled
    },
    {
      provide: WALLETCONNECT_PROJECT_ID,
      useValue: environment.walletConnect.project_id
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
