import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';

import { PlaceholderPageComponent } from './placeholder.component';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'create-account',
    loadChildren: () => import('./create-account/create-account.module').then(m => m.CreateAccountModule)
  },
  {
    path: 'import-account',
    loadChildren: () => import('./import/import.module').then(m => m.ImportModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./no-account/no-account.module').then(m => m.NoAccountModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'transfers',
        loadChildren: () => import('./transfers/transfers.module').then(m => m.TransfersModule)
      },
      {
        path: 'leasing',
        loadChildren: () => import('./leasing/leasing.module').then(m => m.LeasingModule)
      },
      {
        path: 'anchors',
        loadChildren: () => import('./anchors/anchors.module').then(m => m.AnchorsModule)
      },
      {
        path: 'bridge',
        loadChildren: () => import('./bridge/bridge.module').then(m => m.BridgeModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings-page/settings-page.module').then(m => m.SettingsPageModule)
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
    PlaceholderPageComponent // Standalone, no need for a module
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
