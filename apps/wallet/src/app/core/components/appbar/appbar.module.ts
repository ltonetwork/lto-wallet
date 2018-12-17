import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule } from '@angular/material';
import { AppbarComponent } from './appbar.component';
import { BrandModule } from '../brand';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AppbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    BrandModule
  ],
  exports: [AppbarComponent]
})
export class AppbarModule {}
