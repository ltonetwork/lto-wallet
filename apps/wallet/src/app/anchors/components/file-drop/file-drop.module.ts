import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropComponent } from './file-drop.component';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxFileDropModule } from 'ngx-file-drop';

@NgModule({
  declarations: [FileDropComponent],
  imports: [CommonModule, MatIconModule, FlexLayoutModule, NgxFileDropModule],
  exports: [FileDropComponent],
})
export class FileDropModule {}
