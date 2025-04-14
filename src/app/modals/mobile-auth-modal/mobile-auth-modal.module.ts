import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { MobileAuthModalComponent } from './mobile-auth-modal.component';
import { MobileAuthModal } from './mobile-auth-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';

@NgModule({
    declarations: [MobileAuthModalComponent],
    imports: [SharedModule, MatDialogModule, ReactiveFormsModule, QRCodeComponent],
    providers: [MobileAuthModal]
})
export class MobileAuthModalModule {}
