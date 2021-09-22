import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DepositModalComponent } from './deposit-modal.component';
import { DepositModal } from './deposit-modal';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [DepositModalComponent],
  imports: [
    CommonModule,
    QRCodeModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
  ],
  entryComponents: [DepositModalComponent],
  providers: [DepositModal],
})
export class DepositModalModule {}
