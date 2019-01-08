import { Component, OnInit, Inject } from '@angular/core';
import { BRIDGE_ENABLED } from '../../../tokens';

@Component({
  selector: 'lto-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(@Inject(BRIDGE_ENABLED) public bridgeEnabled: boolean) {}

  ngOnInit() {}

  showSettings() {}
}
