import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDetailsComponent } from './anchor-details.component';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CopyableTextComponent } from '@app/components';

@NgModule({
  declarations: [AnchorDetailsComponent],
  imports: [CommonModule, MatCardModule, FlexLayoutModule, CopyableTextComponent],
  exports: [AnchorDetailsComponent],
})
export class AnchorDetailsModule {}
