import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FormsModule } from '@angular/forms';

import { AmountDividePipeModule, TypeLabelPipeModule, IsYouPipeModule } from './pipes';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    FormsModule,
    AmountDividePipeModule,
    TypeLabelPipeModule,
    IsYouPipeModule,
  ]
})
export class SharedModule {}
