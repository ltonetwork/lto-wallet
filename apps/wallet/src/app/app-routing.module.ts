import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';
// import { SigninComponent, SigninModule } from './signin';
import { CreateAccountComponent, CreateAccountModule } from './create-account';
import { ImportComponent, ImportModule } from './import';
import { NoAccountComponent, NoAccountModule } from './no-account';
import { TransfersComponent, TransfersModule } from './transfers';
import { LeasingComponent } from './leasing/leasing.component';
import { AnchorsComponent, AnchorsModule } from './anchors';
import { BridgePageComponent } from './bridge-page/bridge-page.component';
import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  },
  {
    path: 'import-account',
    component: ImportComponent
  },
  {
    path: 'start',
    component: NoAccountComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
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
        path: 'bridge',
        component: BridgePageComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'transfers'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // SigninModule,
    CreateAccountModule,
    ImportModule,
    NoAccountModule,
    TransfersModule,
    AnchorsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
