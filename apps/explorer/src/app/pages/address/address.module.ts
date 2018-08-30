import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AddressComponent } from './address.component';

@NgModule({
  imports: [SharedModule],
  declarations: [AddressComponent]
})
export class AddressModule {}
