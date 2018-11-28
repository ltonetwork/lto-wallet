import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from './account-info.component';
import { AccountInfoModal } from './account-info.modal';
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AccountInfoComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  entryComponents: [AccountInfoComponent],
  providers: [AccountInfoModal]
})
export class AccountInfoModule {}
