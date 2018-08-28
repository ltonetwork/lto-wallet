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

@NgModule({
  imports: [
    SharedModule,
    PageContentModule,
    AmountPipeModule,
    MatToolbarModule,
    TransactionsSectionModule,
    RouterModule.forChild([
      {
        path: '',
        component: WalletComponent
      }
    ])
  ],
  declarations: [WalletComponent]
})
export class WalletModule {}
