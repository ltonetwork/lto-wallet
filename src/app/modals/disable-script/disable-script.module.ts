import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableScriptModal } from './disable-script-modal';
import { DisableScriptComponent } from './disable-script.component';
import { AmountDividePipeModule } from '../../shared/pipes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DisableScriptComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, AmountDividePipeModule],
  entryComponents: [DisableScriptComponent],
  providers: [DisableScriptModal],
})
export class DisableScriptModule {}
