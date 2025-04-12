import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DepositModalComponent } from './deposit-modal.component';
import { DepositModal } from '@app/modals';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
    declarations: [DepositModalComponent],
    imports: [
        CommonModule,
        QRCodeComponent,
        MatInputModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
    ],
    providers: [DepositModal]
})
export class DepositModalModule {}
