import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wallet/shared';
import { MatTableModule } from '@angular/material';
import { LeasingComponent } from './leasing.component';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
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
