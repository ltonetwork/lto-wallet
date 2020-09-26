import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
    BrandModule,
  ],
  exports: [AppbarComponent],
})
export class AppbarModule {}
