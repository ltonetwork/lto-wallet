import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'lto-wallet-disable-script',
    templateUrl: './disable-script.component.html',
    styleUrls: ['./disable-script.component.scss'],
    standalone: false
})
export class DisableScriptComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public fee: number) {}

  ngOnInit() {}
}
