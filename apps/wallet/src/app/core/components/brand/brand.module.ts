import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandComponent } from './brand.component';

@NgModule({
  imports: [RouterModule.forChild([])],
  declarations: [BrandComponent],
  exports: [BrandComponent]
})
export class BrandModule {}
