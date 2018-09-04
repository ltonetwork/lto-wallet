import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { ReceiveModalComponent } from './receive-modal.component';
import { ReceiveModal } from './receive-modal';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MatDialogModule, MatButtonModule],
  declarations: [ReceiveModalComponent],
  entryComponents: [ReceiveModalComponent],
  providers: [ReceiveModal]
})
export class ReceiveModalModule {}
