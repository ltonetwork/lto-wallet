import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MobileAuthModalComponent } from './mobile-auth-modal.component';
import { toPromise } from '../../core';

@Injectable()
export class MobileAuthModal {
  constructor(private matDialog: MatDialog) {}

  show(): Promise<void> {
    const dialog = this.matDialog.open(MobileAuthModalComponent, {
      maxWidth: '100%',
      width: '500px',
    });
    return toPromise(dialog.afterClosed());
  }
}
