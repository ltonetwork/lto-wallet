import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeLabelPipe } from './type-label.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TypeLabelPipe],
  exports: [TypeLabelPipe]
})
export class TypeLabelModule {}
