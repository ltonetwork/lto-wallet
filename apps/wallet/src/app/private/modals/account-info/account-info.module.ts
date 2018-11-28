import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoModal } from './account-info.modal';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AccountInfoComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, FlexLayoutModule],
  entryComponents: [AccountInfoComponent],
  providers: [AccountInfoModal]
})
export class AccountInfoModule {}
