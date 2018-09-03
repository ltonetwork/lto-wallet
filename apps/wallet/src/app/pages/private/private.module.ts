import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrivateComponent } from './private.component';

@NgModule({
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivateComponent,
        children: [
          {
            path: 'transaction',
            loadChildren: './transaction/transaction.module#TransactionModule'
          },
          {
            path: 'address',
            loadChildren: './address/address.module#AddressModule'
          },
          {
            path: '',
            loadChildren: './address/address.module#AddressModule'
          }
        ]
      }
    ])
  ],
  declarations: [PrivateComponent]
})
export class PrivateModule {}
