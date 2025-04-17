import { NgModule } from '@angular/core';
import { WalletConnectModalComponent } from './wallet-connect-modal.component';
import { WalletConnectModal } from './wallet-connect-modal';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@app/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WalletConnectModalComponent],
  imports: [
    CommonModule,
    CoreModule,
    MatDialogModule,
    MatSnackBarModule,
    QRCodeComponent,
    MatButtonModule,
    RouterModule,
  ],
  providers: [WalletConnectModal],
})
export class WalletConnectModalModule {}
