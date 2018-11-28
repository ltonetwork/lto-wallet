import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { ImportComponent } from './import/import.component';
import { CreateComponent } from './create/create.component';
import { NoAccountComponent } from './no-account/no-account.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatStepperModule,
  MatProgressBarModule
} from '@angular/material';

import { NoAccountGuard } from './no-account.guard';
import { CredentialsFormModule } from './components/credentials-form';

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    ImportComponent,
    CreateComponent,
    NoAccountComponent
  ],
  imports: [
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatStepperModule,
    MatProgressBarModule,
    CredentialsFormModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent,
        children: [
          {
            path: 'signin',
            component: SigninComponent
          },
          {
            path: 'import',
            component: ImportComponent
          },
          {
            path: 'create',
            component: CreateComponent
          },
          {
            path: '',
            pathMatch: 'full',
            canActivate: [NoAccountGuard],
            component: NoAccountComponent
          }
        ]
      }
    ])
  ]
})
export class AuthModule {}
