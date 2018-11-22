import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawModalComponent } from './withdraw-modal.component';
import { WithdrawModal } from './withdraw-modal';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  declarations: [WithdrawModalComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [WithdrawModal],
  entryComponents: [WithdrawModalComponent]
})
export class WithdrawModalModule {}
