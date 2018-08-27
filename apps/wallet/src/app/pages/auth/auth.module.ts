import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
          }
        ]
      }
    ])
  ],
  declarations: [LoginComponent, AuthComponent]
})
export class AuthModule {}
