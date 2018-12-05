import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';
// import { SigninComponent, SigninModule } from './signin';
import { CreateAccountComponent, CreateAccountModule } from './create-account';
import { ImportComponent, ImportModule } from './import';
import { NoAccountComponent, NoAccountModule } from './no-account';
import { TransfersComponent, TransfersModule } from './transfers';
import { LeasingComponent, LeasingModule } from './leasing';
import { AnchorsComponent, AnchorsModule } from './anchors';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: './signin/signin.module#SigninModule'
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
    LeasingModule,
    AnchorsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
