import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LeaseDetailsModalComponent } from './lease-details-modal.component';
import { LeaseDetailsModal } from './lease-details-modal';
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
  declarations: [LeaseDetailsModalComponent],
  entryComponents: [LeaseDetailsModalComponent],
  providers: [LeaseDetailsModal]
})
export class LeaseDetailsModalModule {}
