import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
import { SeedComponent } from './components/seed/seed.component';
import { ContentSectionComponent, CrendetialsFormComponent } from '@app/components';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountComponent
  }
];

@NgModule({
  declarations: [CreateAccountComponent, SeedComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ContentSectionComponent, CrendetialsFormComponent]
})
export class CreateAccountModule {}
