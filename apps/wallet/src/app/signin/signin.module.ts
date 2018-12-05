import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { SigninComponent } from './signin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SigninComponent],
  imports: [
    SharedModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: SigninComponent
      }
    ])
  ]
})
export class SigninModule {}
