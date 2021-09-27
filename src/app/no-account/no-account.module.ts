import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { NoAccountComponent } from './no-account.component';

@NgModule({
  declarations: [NoAccountComponent],
  imports: [SharedModule, RouterModule.forChild([])]
})
export class NoAccountModule {}
