import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { LTO_NETWORK_BYTE } from './tokens';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HttpClientModule],
  providers: [
    {
      provide: LTO_NETWORK_BYTE,
      useValue: 'T'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
