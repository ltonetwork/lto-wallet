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
            path: 'portfolio',
            loadChildren: './portfolio-page/portfolio-page.module#PortfolioPageModule'
          },
          {
            path: 'transactions',
            loadChildren: './transactions/transactions.module#TransactionsModule'
          },
          {
            path: 'leasing',
            loadChildren: './leasing/leasing.module#LeasingModule'
          },
          {
            path: '',
            redirectTo: 'portfolio'
          }
        ]
      }
    ])
  ],
  declarations: [PrivateComponent]
})
export class PrivateModule {}
