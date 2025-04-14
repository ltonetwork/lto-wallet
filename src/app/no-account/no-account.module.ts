import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule, Routes } from '@angular/router';
import { NoAccountComponent } from './no-account.component';

const routes: Routes = [
  {
    path: '',
    component: NoAccountComponent,
  }
];

@NgModule({
  declarations: [NoAccountComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class NoAccountModule {}
