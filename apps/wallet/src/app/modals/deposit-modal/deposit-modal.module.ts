import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatButtonModule
} from '@angular/material';
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
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  entryComponents: [DepositModalComponent],
  providers: [DepositModal]
})
export class DepositModalModule {}
