import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
import { SeedComponent } from './components/seed/seed.component';

@NgModule({
  declarations: [CreateAccountComponent, SeedComponent],
  imports: [SharedModule, RouterModule.forChild([])]
})
export class CreateAccountModule {}
