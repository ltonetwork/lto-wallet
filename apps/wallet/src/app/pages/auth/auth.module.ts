import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { SharedModule } from '@wallet/shared';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
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
            path: '',
            pathMatch: 'full',
            redirectTo: 'login'
          }
        ]
      }
    ])
  ],
  declarations: [LoginComponent, AuthComponent, CreateComponent]
})
export class AuthModule {}
