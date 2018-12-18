import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from '../shared';

import { AmountInputComponent } from './amount-input/amount-input.component';
import { BridgeDepositDialogComponent } from './bridge-deposit-dialog/bridge-deposit-dialog.component';
import { BridgeWithdrawDialogComponent } from './bridge-withdraw-dialog/bridge-withdraw-dialog.component';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

@NgModule({
  imports: [SharedModule, QRCodeModule, RecaptchaModule],
  declarations: [
    AmountInputComponent,
    BridgeDepositDialogComponent,
    BridgeWithdrawDialogComponent,
    DeleteAccountDialogComponent
  ],
  exports: [AmountInputComponent, BridgeDepositDialogComponent, BridgeWithdrawDialogComponent],
  entryComponents: [
    BridgeDepositDialogComponent,
    BridgeWithdrawDialogComponent,
    DeleteAccountDialogComponent
  ]
})
export class WalletComponentsModule {}
