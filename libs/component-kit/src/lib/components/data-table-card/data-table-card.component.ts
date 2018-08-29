import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-data-table-card',
  templateUrl: './data-table-card.component.html',
  styleUrls: ['./data-table-card.component.scss']
})
export class DataTableCardComponent implements OnInit {
  @Input()
  title: string = '';
  constructor() {}

  ngOnInit() {}
}
