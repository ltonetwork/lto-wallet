import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { QRCodeModule } from 'angularx-qrcode';
import { BridgeSwapComponent } from './bridge-swap.component';
import { SwapTypeComponent } from './steps/swap-type/swap-type.component';
import { ExampleComponent } from './steps/example/example.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DepositErcComponent } from './steps/deposit-erc/deposit-erc.component';
import { CopyableTextModule, LoadingSpinnerModule } from '../../../shared/components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgSuspenseModule } from 'ng-suspense';
import { WithdrawFormComponent } from './steps/withdraw-form/withdraw-form.component';
import { WithdrawCexComponent } from './steps/withdraw-cex/withdraw-cex.component';

@NgModule({
  declarations: [
    BridgeSwapComponent,
    SwapTypeComponent,
    ExampleComponent,
    DepositErcComponent,
    WithdrawFormComponent,
    WithdrawCexComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    RecaptchaModule,
    QRCodeModule,
    CopyableTextModule,
    FlexLayoutModule,
    NgSuspenseModule,
    LoadingSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [BridgeSwapComponent],
  entryComponents: [BridgeSwapComponent],
})
export class BridgeSwapModule {}
