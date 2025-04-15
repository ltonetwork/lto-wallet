import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableScriptModal } from './disable-script-modal';
import { DisableScriptComponent } from './disable-script.component';
import { AmountDividePipeModule } from '../../core/pipes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [DisableScriptComponent],
    imports: [CommonModule, MatDialogModule, MatButtonModule, AmountDividePipeModule],
    providers: [DisableScriptModal]
})
export class DisableScriptModule {}
