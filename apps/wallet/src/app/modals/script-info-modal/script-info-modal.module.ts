import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScriptInfoModalComponent } from './script-info-modal.component';
import { ScriptInfoModal } from './script-info-modal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ScriptInfoModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, FlexLayoutModule],
  entryComponents: [ScriptInfoModalComponent],
  providers: [ScriptInfoModal],
})
export class ScriptInfoModalModule {}
