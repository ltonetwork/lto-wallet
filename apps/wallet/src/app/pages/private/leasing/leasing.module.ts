import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wallet/shared';
import { LeasingComponent } from './leasing.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeasingComponent
      }
    ])
  ],
  declarations: [LeasingComponent]
})
export class LeasingModule {}
