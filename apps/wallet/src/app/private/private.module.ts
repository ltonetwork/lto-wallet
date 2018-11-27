import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { BackupComponent } from './backup/backup.component';
import { PrivateComponent } from './private.component';
import { TransfersComponent } from './transfers/transfers.component';
import { LeasingComponent } from './leasing/leasing.component';
import { AnchorsComponent } from './anchors/anchors.component';

import {
  StartLeaseModalModule,
  MakeTransactionModalModule,
  DepositModalModule,
  WithdrawModalModule,
  BackupAccountModalModule
} from './modals';

@NgModule({
  declarations: [
    BackupComponent,
    PrivateComponent,
    TransfersComponent,
    LeasingComponent,
    AnchorsComponent
  ],
  imports: [
    SharedModule,
    StartLeaseModalModule,
    MakeTransactionModalModule,
    DepositModalModule,
    WithdrawModalModule,
    BackupAccountModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: PrivateComponent,
        children: [
          {
            path: 'backup',
            component: BackupComponent
          },
          {
            path: 'transfers',
            component: TransfersComponent
          },
          {
            path: 'leasing',
            component: LeasingComponent
          },
          {
            path: 'anchors',
            component: AnchorsComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'transfers'
          }
        ]
      }
    ])
  ]
})
export class PrivateModule {}
