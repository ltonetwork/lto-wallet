import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlocksListComponent } from './blocks-list.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, RouterModule.forChild([])],
  declarations: [BlocksListComponent],
  exports: [BlocksListComponent]
})
export class BlocksListModule {}
