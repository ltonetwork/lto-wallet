import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SharedModule } from '@app/shared';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  }
];

@NgModule({
  declarations: [SigninComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)]
})
export class SigninModule {}
