import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { RecaptchaModule } from 'ng-recaptcha';
import { SharedModule } from '../shared';

import { AmountInputComponent } from './amount-input/amount-input.component';
import { BridgeDepositDialogComponent } from './bridge-deposit-dialog/bridge-deposit-dialog.component';
import { BridgeWithdrawDialogComponent } from './bridge-withdraw-dialog/bridge-withdraw-dialog.component';

@NgModule({
  imports: [SharedModule, QRCodeModule, RecaptchaModule],
  declarations: [AmountInputComponent, BridgeDepositDialogComponent, BridgeWithdrawDialogComponent],
  exports: [AmountInputComponent, BridgeDepositDialogComponent, BridgeWithdrawDialogComponent],
  entryComponents: [BridgeDepositDialogComponent, BridgeWithdrawDialogComponent]
})
export class WalletComponentsModule {}
