import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionInfoComponent } from './transaction-info.component';
import { TransactionInfoModal } from './transaction-info-modal';

@NgModule({
  imports: [CommonModule],
  declarations: [TransactionInfoComponent],
  entryComponents: [TransactionInfoComponent],
  providers: [TransactionInfoModal]
})
export class TransactionInfoModule {}
