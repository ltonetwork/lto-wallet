import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableMedia } from '@angular/flex-layout';
import { AuthService, Sidenav, SidenavMode } from './core';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'lto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  authenticated$!: Observable<boolean>;
  opened$!: Observable<boolean>;
  mode$!: Observable<SidenavMode>;
  hasBackdrop$!: Observable<boolean>;

  constructor(private _auth: AuthService, private _sidenav: Sidenav) {}

  ngOnInit() {
    this.authenticated$ = this._auth.authenticated$;
    this.opened$ = this._sidenav.opened$;
    this.mode$ = this._sidenav.mode$;
    this.hasBackdrop$ = this._sidenav.hasBackdrop$;
  }

  closeSidenav() {
    this._sidenav.close();
  }
}
