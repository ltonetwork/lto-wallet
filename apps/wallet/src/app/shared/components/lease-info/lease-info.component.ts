import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lto-lease-info',
  templateUrl: './lease-info.component.html',
  styleUrls: ['./lease-info.component.scss']
})
export class LeaseInfoComponent implements OnInit {
  @Input() transaction!: any;
  @Input() canceling = true;
  @Input() unconfirmed = false;
  @Output() cancel = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  _cancel() {
    this.cancel.next();
  }
}
