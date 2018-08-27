import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { AddressComponent } from './address.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: AddressComponent,
        data: {
          sectionName: 'Address details'
        }
      }
    ])
  ],
  declarations: [AddressComponent]
})
export class AddressModule {}
