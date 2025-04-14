import { Component, OnInit, Inject } from '@angular/core';
import { SWAP_PAGE_ENABLED } from '@app/tokens';
import { Sidenav } from '@app/core';
import { CommonModule } from '@angular/common';
import { BrandModule } from '@app/shared/components/brand';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'lto-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  imports: [
    CommonModule,
    BrandModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatDividerModule,
  ],
})
export class SidenavComponent implements OnInit {
  constructor(@Inject(SWAP_PAGE_ENABLED) public swapEnabled: boolean, private _sidenav: Sidenav) {}

  ngOnInit() {}

  showSettings() {}

  linkClick() {
    this._sidenav.close();
  }
}
