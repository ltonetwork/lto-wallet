import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionTableModule } from '../transactions-table';
import { TransactionsSectionComponent } from './transactions-section.component';
import { DataTableCardModule } from '../data-table-card';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, TransactionTableModule, DataTableCardModule],
  declarations: [TransactionsSectionComponent],
  exports: [TransactionsSectionComponent]
})
export class TransactionsSectionModule {}
