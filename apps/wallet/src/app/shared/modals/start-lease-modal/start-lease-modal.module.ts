import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { AmountPipeModule } from '@legalthings-one/component-kit';
import {
  MatDialogModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { StartLeaseModalComponent } from './start-lease-modal.component';
import { StartLeaseModal } from './start-lease-modal';

@NgModule({
  imports: [
    AmountPipeModule,
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [StartLeaseModalComponent],
  entryComponents: [StartLeaseModalComponent],
  providers: [StartLeaseModal]
})
export class StartLeaseModalModule {}
