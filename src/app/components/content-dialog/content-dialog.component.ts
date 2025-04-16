import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

export interface DialogData {
  title: string;
  content: string;
}

@Component({
  selector: 'lto-wallet-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.scss'],
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogTitle
  ]
})
export class ContentDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {}
}
