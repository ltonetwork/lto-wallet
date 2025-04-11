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
import { SettingsPageComponent, SigninComponent } from './pages';

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
        loadChildren: './pages/bridge/bridge.module#BridgeModule'
      },
      {
        path: 'settings',
        component: SettingsPageComponent
      },
      {
        path: 'seed-swap',
        loadChildren: './pages/token-swap/token-swap.module#TokenSwapModule'
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
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
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
