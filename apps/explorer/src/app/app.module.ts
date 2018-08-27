// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppComponent } from './app.component';
// import { NxModule } from '@nrwl/nx';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     NxModule.forRoot()
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule, AMOUNT_DIVIDER } from './shared';
import { CoreModule } from './core';
import { WAVES_API } from '@legalthings-one/waves';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedModule, CoreModule],
  providers: [
    {
      provide: WAVES_API,
      useValue: 'https://nodes.wavesnodes.com/'
      // useValue: 'https://testnet.legalthings.one/'
    },
    {
      provide: AMOUNT_DIVIDER,
      useValue: 100000000
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
