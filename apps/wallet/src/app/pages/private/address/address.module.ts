import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressComponent, AddressModule as ExplorerAddressModule } from '@explorer/pages/address';

@NgModule({
  imports: [
    ExplorerAddressModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AddressComponent
      }
    ])
  ],
  declarations: []
})
export class AddressModule {}
