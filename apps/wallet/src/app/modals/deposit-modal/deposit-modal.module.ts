import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DepositModalComponent } from './deposit-modal.component';
import { DepositModal } from './deposit-modal';

@NgModule({
  declarations: [DepositModalComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  entryComponents: [DepositModalComponent],
  providers: [DepositModal]
})
export class DepositModalModule {}
