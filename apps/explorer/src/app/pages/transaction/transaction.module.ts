import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';
import { TransactionComponent } from './transaction.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: TransactionComponent,
        data: {
          sectionName: 'Transaction details'
        }
      }
    ])
  ],
  declarations: [TransactionComponent]
})
export class TransactionModule {}
