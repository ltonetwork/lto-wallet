import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core';

import { PlaceholderPageComponent } from './placeholder.component';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule)
  },
  { path: 'create-account', component: PlaceholderPageComponent, data: { title: 'Create Account' } },
  { path: 'import-account', component: PlaceholderPageComponent, data: { title: 'Import Account' } },
  { path: 'start', component: PlaceholderPageComponent, data: { title: 'No Account' } },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'transfers', component: PlaceholderPageComponent, data: { title: 'Transfers' } },
      { path: 'leasing', component: PlaceholderPageComponent, data: { title: 'Leasing' } },
      { path: 'anchors', component: PlaceholderPageComponent, data: { title: 'Anchors' } },
      { path: 'bridge', component: PlaceholderPageComponent, data: { title: 'Bridge' } },
      { path: 'settings', component: PlaceholderPageComponent, data: { title: 'Settings' } },
      { path: '', pathMatch: 'full', redirectTo: 'transfers' }
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
