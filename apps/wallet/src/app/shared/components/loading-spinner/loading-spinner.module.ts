import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [MatProgressSpinnerModule],
  exports: [LoadingSpinnerComponent]
})
export class LoadingSpinnerModule {}
