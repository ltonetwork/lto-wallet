import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropComponent } from './file-drop.component';
import { MatIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileDropModule as NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [FileDropComponent],
  imports: [CommonModule, MatIconModule, FlexLayoutModule, NgxFileDropModule],
  exports: [FileDropComponent]
})
export class FileDropModule {}
