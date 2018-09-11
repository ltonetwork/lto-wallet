import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { MyWalletInfoModalComponent } from './my-wallet-info-modal.component';
import { MyWalletInfoModal } from './my-wallet-info-modal';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MatDialogModule, MatButtonModule, FlexLayoutModule],
  declarations: [MyWalletInfoModalComponent],
  entryComponents: [MyWalletInfoModalComponent],
  providers: [MyWalletInfoModal]
})
export class MyWalletInfoModalModule {}
