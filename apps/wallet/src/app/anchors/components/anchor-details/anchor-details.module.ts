import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnchorDetailsComponent } from './anchor-details.component';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CopyableTextModule } from '../../../shared/components';

@NgModule({
  declarations: [AnchorDetailsComponent],
  imports: [CommonModule, MatCardModule, FlexLayoutModule, CopyableTextModule],
  exports: [AnchorDetailsComponent]
})
export class AnchorDetailsModule {}
