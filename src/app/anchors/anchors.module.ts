import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { AnchorsComponent } from './anchors.component';
import { FileDropModule, AnchorDetailsModule } from './components';

@NgModule({
  declarations: [AnchorsComponent],
  imports: [SharedModule, FileDropModule, AnchorDetailsModule]
})
export class AnchorsModule {}
