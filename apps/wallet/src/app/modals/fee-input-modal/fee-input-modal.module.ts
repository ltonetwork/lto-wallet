import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeeInputModalComponent } from './fee-input-modal.component';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
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
    FlexLayoutModule,
  ],
  entryComponents: [FeeInputModalComponent],
  providers: [FeeInputModal],
})
export class FeeInputModalModule {}
