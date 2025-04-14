import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsPageComponent } from './settings-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CreateScriptModal, ScriptInfoModal, DisableScriptModal } from '@app/modals';

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatSnackBarModule,
  ],
  providers: [
    CreateScriptModal,
    ScriptInfoModal,
    DisableScriptModal,
  ],
})
export class SettingsPageModule {}
