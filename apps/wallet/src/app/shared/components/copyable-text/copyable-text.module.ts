import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyableTextComponent } from './copyable-text.component';
import { MatIconModule, MatRippleModule, MatTooltipModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [CopyableTextComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatRippleModule, MatTooltipModule],
  exports: [CopyableTextComponent]
})
export class CopyableTextModule {}
