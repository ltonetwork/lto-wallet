import { Component, OnInit, Inject } from '@angular/core';
import { BRIDGE_ENABLED } from '../../../tokens';
import { Sidenav } from '../../services';

@Component({
  selector: 'lto-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(@Inject(BRIDGE_ENABLED) public bridgeEnabled: boolean, private _sidenav: Sidenav) {}

  ngOnInit() {}

  showSettings() {}

  linkClick() {
    this._sidenav.close();
  }
}
