import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyableTextComponent } from './copyable-text.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [CopyableTextComponent],
  imports: [CommonModule, FlexLayoutModule, MatIconModule, MatRippleModule, MatTooltipModule],
  exports: [CopyableTextComponent],
})
export class CopyableTextModule {}
