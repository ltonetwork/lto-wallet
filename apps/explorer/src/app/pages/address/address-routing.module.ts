import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddressModule } from './address.module';
import { AddressComponent } from './address.component';

@NgModule({
  imports: [
    AddressModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AddressComponent,
        data: {
          sectionName: 'Address details'
        }
      }
    ])
  ]
})
export class AddressRoutingModule {}
