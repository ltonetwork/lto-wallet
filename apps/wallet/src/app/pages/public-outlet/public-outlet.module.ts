import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PublicOutletComponent } from './public-outlet.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: PublicOutletComponent
      }
    ])
  ],
  declarations: [PublicOutletComponent]
})
export class PublicOutletModule {}
