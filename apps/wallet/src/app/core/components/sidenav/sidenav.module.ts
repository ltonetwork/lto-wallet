import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';
import { MatToolbarModule, MatIconModule, MatDividerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrandModule } from '../brand';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    BrandModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatDividerModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule {}
