import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [SharedModule]
})
export class AboutModule {}
