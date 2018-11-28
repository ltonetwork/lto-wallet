import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HiddenTextComponent } from './hidden-text.component';
import { MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [HiddenTextComponent],
  imports: [CommonModule, MatButtonModule, FlexLayoutModule],
  exports: [HiddenTextComponent]
})
export class HiddenTextModule {}
