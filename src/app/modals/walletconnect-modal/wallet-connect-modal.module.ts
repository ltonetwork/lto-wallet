import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { WalletConnectModalComponent } from './wallet-connect-modal.component';
import { WalletConnectModal } from './wallet-connect-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [WalletConnectModalComponent],
  imports: [SharedModule, MatDialogModule, ReactiveFormsModule, QRCodeModule],
  providers: [WalletConnectModal],
  entryComponents: [WalletConnectModalComponent],
})
export class WalletConnectModalModule {}
