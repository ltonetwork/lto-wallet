import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: './pages/private/private.module#PrivateModule'
  }
  // {
  //   path: 'blocks',
  //   pathMatch: 'full',
  //   loadChildren: './pages/blocks/blocks.module#BlocksModule'
  // },
  // {
  //   path: 'block',
  //   loadChildren: './pages/block/block.module#BlockModule'
  // },
  // {
  //   path: 'transaction',
  //   loadChildren: './pages/transaction/transaction.module#TransactionModule'
  // },
  // {
  //   path: 'address',
  //   loadChildren: './pages/address/address.module#AddressModule'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
