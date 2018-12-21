import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrandComponent } from './brand.component';

@NgModule({
  declarations: [BrandComponent],
  imports: [CommonModule, RouterModule.forChild([])],
  exports: [BrandComponent]
})
export class BrandModule {}
