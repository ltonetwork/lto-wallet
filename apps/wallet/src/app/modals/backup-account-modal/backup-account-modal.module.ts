import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { BackupAccountModalComponent } from './backup-account-modal.component';
import { BackupAccountModal } from './backup-account-modal';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BackupAccountModalComponent],
  imports: [SharedModule, MatDialogModule, MatButtonModule, FlexLayoutModule],
  entryComponents: [BackupAccountModalComponent],
  providers: [BackupAccountModal]
})
export class BackupAccountModalModule {}
