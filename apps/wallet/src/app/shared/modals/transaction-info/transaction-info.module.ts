import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TransactionInfoComponent } from './transaction-info.component';
import { TransactionInfoModal } from './transaction-info-modal';
import { KeyvalueListModule, AmountPipeModule } from '@legalthings-one/component-kit';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    KeyvalueListModule,
    AmountPipeModule
  ],
  declarations: [TransactionInfoComponent],
  entryComponents: [TransactionInfoComponent],
  providers: [TransactionInfoModal]
})
export class TransactionInfoModule {}
