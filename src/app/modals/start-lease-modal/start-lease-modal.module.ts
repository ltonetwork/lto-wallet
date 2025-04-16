import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { MatDialogModule } from '@angular/material/dialog';
import { StartLeaseModalComponent } from './start-lease-modal.component';
import { StartLeaseModal } from './start-lease-modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AmountDividePipe } from '@app/pipes/amount-divide/amount-divide.pipe';
import { MatChip } from '@angular/material/chips';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule, AmountDividePipe, MatChip],
    declarations: [StartLeaseModalComponent],
    providers: [StartLeaseModal]
})
export class StartLeaseModalModule {}
