import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { MobileAuthModalComponent } from './mobile-auth-modal.component';
import { MobileAuthModal } from './mobile-auth-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
    declarations: [MobileAuthModalComponent],
    imports: [SharedModule, MatDialogModule, ReactiveFormsModule, QRCodeModule],
    providers: [MobileAuthModal]
})
export class MobileAuthModalModule {}
