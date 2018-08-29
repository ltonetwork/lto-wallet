import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lto-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.scss']
})
export class PageContentComponent implements OnInit {
  @Input()
  separateHeader: boolean = false;

  constructor() {}

  ngOnInit() {}
}
