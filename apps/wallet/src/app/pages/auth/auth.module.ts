import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { SharedModule } from '@wallet/shared';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { CreateComponent } from './create/create.component';
import { RestoreComponent } from './restore/restore.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
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
            path: 'create',
            component: CreateComponent
          },
          {
            path: 'restore',
            component: RestoreComponent
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
  declarations: [LoginComponent, AuthComponent, CreateComponent, RestoreComponent]
})
export class AuthModule {}
