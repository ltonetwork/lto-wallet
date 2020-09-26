import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransactionComponent } from './transaction.component';

@NgModule({
  imports: [SharedModule, MatTableModule, MatTooltipModule, RouterModule.forChild([])],
  declarations: [TransactionComponent],
})
export class TransactionModule {}
