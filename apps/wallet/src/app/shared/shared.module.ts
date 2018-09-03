import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { AmountPipeModule } from '@legalthings-one/component-kit';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    AmountPipeModule,
    FlexLayoutModule
  ],
  declarations: []
})
export class SharedModule {}
