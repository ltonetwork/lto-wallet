import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from '../../shared';
import { TokenSwapComponent } from './token-swap.component';
import { SwapDialogComponent } from './components/swap-dialog/swap-dialog.component';

@NgModule({
  imports: [
    SharedModule,
    RecaptchaModule,
    QRCodeModule,
    RouterModule.forChild([
      {
        path: '',
        component: TokenSwapComponent
      }
    ])
  ],
  declarations: [TokenSwapComponent, SwapDialogComponent],
  entryComponents: [SwapDialogComponent]
})
export class TokenSwapModule {}
