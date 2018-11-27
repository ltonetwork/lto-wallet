import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'lto-backup-account-modal',
  templateUrl: './backup-account-modal.component.html',
  styleUrls: ['./backup-account-modal.component.scss']
})
export class BackupAccountModalComponent implements OnInit {
  phrase: string;

  constructor(auth: AuthService, private dialogRef: MatDialogRef<any>) {
    this.phrase = auth.wallet.seed;
  }

  ngOnInit() {}

  confirmed() {
    this.dialogRef.close(true);
  }

  later() {
    this.dialogRef.close(false);
  }
}
