import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'ng-recaptcha';
import { QRCodeComponent } from 'angularx-qrcode';
import { SharedModule } from '../../shared';
import { TokenSwapComponent } from './token-swap.component';
import { SwapDialogComponent } from './components/swap-dialog/swap-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        RecaptchaModule,
        ReactiveFormsModule,
        QRCodeComponent,
        RouterModule.forChild([
            {
                path: '',
                component: TokenSwapComponent
            }
        ])
    ],
    declarations: [TokenSwapComponent, SwapDialogComponent]
})
export class TokenSwapModule {}
