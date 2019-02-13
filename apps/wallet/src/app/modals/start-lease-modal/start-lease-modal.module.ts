import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { MatDialogModule, MatProgressSpinnerModule } from '@angular/material';
import { StartLeaseModalComponent } from './start-lease-modal.component';
import { StartLeaseModal } from './start-lease-modal';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule],
  declarations: [StartLeaseModalComponent],
  entryComponents: [StartLeaseModalComponent],
  providers: [StartLeaseModal]
})
export class StartLeaseModalModule {}
