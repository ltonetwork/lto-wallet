import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropComponent } from './file-drop.component';

@NgModule({
  declarations: [FileDropComponent],
  imports: [CommonModule],
  exports: [FileDropComponent]
})
export class FileDropModule {}
