import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wallet/shared';
import { PortfolioPageComponent } from './portfolio-page.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PortfolioPageComponent
      }
    ])
  ],
  declarations: [PortfolioPageComponent]
})
export class PortfolioPageModule {}
