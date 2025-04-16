import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisableScriptModal } from './disable-script-modal';
import { DisableScriptComponent } from './disable-script.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AmountDividePipe } from '@app/pipes/amount-divide/amount-divide.pipe';

@NgModule({
    declarations: [DisableScriptComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule, AmountDividePipe],
    providers: [DisableScriptModal]
})
export class DisableScriptModule {}
