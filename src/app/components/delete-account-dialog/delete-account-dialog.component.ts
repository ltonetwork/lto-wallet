import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lto-wallet-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss'],
  imports: [
    MatDialogModule,
    FlexModule,
    MatButtonModule,
  ]
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
