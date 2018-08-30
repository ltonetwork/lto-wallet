import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wallet/shared';
import {
  PageContentModule,
  AmountPipeModule,
  TransactionsSectionModule
} from '@legalthings-one/component-kit';

import { MatToolbarModule } from '@angular/material';
import { WalletComponent } from './wallet.component';

import { AddressComponent, AddressModule } from '@explorer/pages/address';

@NgModule({
  imports: [
    SharedModule,
    PageContentModule,
    AmountPipeModule,
    MatToolbarModule,
    TransactionsSectionModule,
    AddressModule,
    RouterModule.forChild([
      {
        path: '',
        component: WalletComponent,
        children: [
          {
            path: ':id',
            component: AddressComponent
          }
        ]
      }
    ])
  ],
  declarations: [WalletComponent]
})
export class WalletModule {}
