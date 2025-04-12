import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared';
import { MatDialogModule } from '@angular/material/dialog';
import { StartLeaseModalComponent } from './start-lease-modal.component';
import { StartLeaseModal } from './start-lease-modal';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    imports: [SharedModule, ReactiveFormsModule, MatDialogModule, MatProgressSpinnerModule],
    declarations: [StartLeaseModalComponent],
    providers: [StartLeaseModal]
})
export class StartLeaseModalModule {}
