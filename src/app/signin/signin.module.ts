import { NgModule } from '@angular/core';
import { SigninComponent } from './signin.component';
import { SharedModule } from '@app/shared';
import { RouterModule, Routes } from '@angular/router';
import { MobileAuthModalModule } from '@app/modals';
import { MaterialModule } from '@app/shared/material.module';
import { ContentSectionComponent } from '@app/components';
import { WalletConnectModalModule } from '@app/modals/walletconnect-modal';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent
  }
];

@NgModule({
  declarations: [SigninComponent],
  imports: [SharedModule, MaterialModule, MobileAuthModalModule, WalletConnectModalModule, RouterModule.forChild(routes), ContentSectionComponent]
})
export class SigninModule {}
