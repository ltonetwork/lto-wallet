import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropComponent } from './file-drop.component';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FileDropComponent],
  imports: [CommonModule, MatIconModule, FlexLayoutModule],
  exports: [FileDropComponent]
})
export class FileDropModule {}
