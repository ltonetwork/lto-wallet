import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { WithdrawModalComponent } from './withdraw-modal.component';
import { WithdrawModal } from './withdraw-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [WithdrawModalComponent],
    imports: [SharedModule, MatDialogModule, ReactiveFormsModule],
    providers: [WithdrawModal]
})
export class WithdrawModalModule {}
