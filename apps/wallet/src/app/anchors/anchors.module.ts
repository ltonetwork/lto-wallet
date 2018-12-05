import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AnchorsComponent } from './anchors.component';
import { FileDropModule } from './components';

@NgModule({
  declarations: [AnchorsComponent],
  imports: [SharedModule, FileDropModule]
})
export class AnchorsModule {}
