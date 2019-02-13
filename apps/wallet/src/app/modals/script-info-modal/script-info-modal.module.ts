import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScriptInfoModalComponent } from './script-info-modal.component';
import { ScriptInfoModal } from './script-info-modal';

@NgModule({
  declarations: [ScriptInfoModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, FlexLayoutModule],
  entryComponents: [ScriptInfoModalComponent],
  providers: [ScriptInfoModal]
})
export class ScriptInfoModalModule {}
