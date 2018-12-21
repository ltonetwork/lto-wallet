import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentSectionComponent } from './content-section.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ContentSectionComponent],
  exports: [ContentSectionComponent]
})
export class ContentSectionModule {}
