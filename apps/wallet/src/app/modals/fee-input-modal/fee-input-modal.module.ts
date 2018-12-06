import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeInputModalComponent } from './fee-input-modal.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import { FeeInputModal } from './fee-input.modal';

@NgModule({
  declarations: [FeeInputModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  entryComponents: [FeeInputModalComponent],
  providers: [FeeInputModal]
})
export class FeeInputModalModule {}
