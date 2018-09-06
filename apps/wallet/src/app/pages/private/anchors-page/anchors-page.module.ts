import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { RouterModule } from '@angular/router';
import { AnchorsPageComponent } from './anchors-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AnchorsPageComponent
      }
    ])
  ],
  declarations: [AnchorsPageComponent]
})
export class AnchorsPageModule {}
