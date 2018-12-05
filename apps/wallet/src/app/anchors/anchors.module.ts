import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AnchorsComponent } from './anchors.component';

@NgModule({
  declarations: [AnchorsComponent],
  imports: [SharedModule]
})
export class AnchorsModule {}
