import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lto-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  imports: [MatProgressSpinnerModule],
})
export class LoadingSpinnerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
