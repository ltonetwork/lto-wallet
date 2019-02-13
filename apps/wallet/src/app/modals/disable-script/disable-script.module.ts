import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { DisableScriptModal } from './disable-script-modal';
import { DisableScriptComponent } from './disable-script.component';
import { AmountDividePipeModule } from '../../shared/pipes';

@NgModule({
  declarations: [DisableScriptComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, AmountDividePipeModule],
  entryComponents: [DisableScriptComponent],
  providers: [DisableScriptModal]
})
export class DisableScriptModule {}
