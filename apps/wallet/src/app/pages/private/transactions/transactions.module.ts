import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@wallet/shared';
import { TransactionsComponent } from './transactions.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: TransactionsComponent
      }
    ])
  ],
  declarations: [TransactionsComponent]
})
export class TransactionsModule {}
