import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatRippleModule
} from '@angular/material';
import { SettingsComponent } from './settings.component';
import { SettingsModal } from './settings.modal';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HiddenTextModule } from './hidden-text';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    HiddenTextModule,
    MatRippleModule
  ],
  entryComponents: [SettingsComponent],
  providers: [SettingsModal]
})
export class SettingsModule {}
