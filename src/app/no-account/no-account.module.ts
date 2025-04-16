import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { RouterModule, Routes } from '@angular/router';
import { NoAccountComponent } from './no-account.component';
import { ContentSectionComponent } from '@app/components';
import { MobileAuthModalModule } from '@app/modals';

const routes: Routes = [
  {
    path: '',
    component: NoAccountComponent,
  }
];

@NgModule({
  declarations: [NoAccountComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    ContentSectionComponent,
    MobileAuthModalModule,
  ]
})
export class NoAccountModule {}
