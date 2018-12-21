import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './core';

@Component({
  selector: 'lto-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidenavOpened$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.sidenavOpened$ = auth.authenticated$;
  }
}
