import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableCardComponent } from './data-table-card.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule],
  declarations: [DataTableCardComponent],
  exports: [DataTableCardComponent]
})
export class DataTableCardModule {}
