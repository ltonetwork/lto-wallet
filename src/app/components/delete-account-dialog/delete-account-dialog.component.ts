import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatChip } from '@angular/material/chips';

@Component({
  selector: 'lto-wallet-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss'],
  imports: [
    MatDialogModule,
    FlexModule,
    MatButtonModule,
    MatChip
  ]
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
