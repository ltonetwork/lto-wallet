import { NgModule } from '@angular/core';
import { SettingsPageComponent } from './settings-page.component';

import { CreateScriptModal, ScriptInfoModal, DisableScriptModal } from '@app/modals';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { AccountQrComponent, ContentSectionComponent, CopyableTextComponent, HiddenTextComponent } from '@app/components';

const routes: Routes = [
  {
    path: '',
    component: SettingsPageComponent,
  }
];

@NgModule({
  declarations: [SettingsPageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CopyableTextComponent,
    HiddenTextComponent,
    AccountQrComponent,
    ContentSectionComponent
  ],
  providers: [
    CreateScriptModal,
    ScriptInfoModal,
    DisableScriptModal,
  ],
})
export class SettingsPageModule {}
