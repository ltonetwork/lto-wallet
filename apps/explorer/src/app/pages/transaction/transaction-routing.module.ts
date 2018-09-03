import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionComponent } from './transaction.component';
import { TransactionModule } from './transaction.module';

@NgModule({
  imports: [
    TransactionModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: TransactionComponent,
        data: {
          sectionName: 'Transaction details'
        }
      }
    ])
  ]
})
export class TransactionRoutingModule {}
