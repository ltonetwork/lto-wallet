import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';

@NgModule({
  declarations: [CreateAccountComponent],
  imports: [SharedModule, RouterModule.forChild([])]
})
export class CreateAccountModule {}
