import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'poe-blocks-list',
  templateUrl: './blocks-list.component.html',
  styleUrls: ['./blocks-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlocksListComponent implements OnInit {
  @Input()
  blocks!: any[];

  constructor() {}

  ngOnInit() {}
}
