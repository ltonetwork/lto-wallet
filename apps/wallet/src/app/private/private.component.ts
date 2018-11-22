import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenService, AuthService } from '../core';
import { BackupAccountModal } from '../modals';
import { Router } from '@angular/router';

@Component({
  selector: 'lto-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {
  sidenavMode$: Observable<string>;

  constructor(
    private screen: ScreenService,
    private backupAccountModal: BackupAccountModal,
    private auth: AuthService,
    private router: Router
  ) {
    this.sidenavMode$ = screen.mediaAlias$.pipe(
      map(alias => {
        switch (alias) {
          case 'lg':
          case 'xl':
            return 'side';
          default:
            return 'over';
        }
      })
    );
  }

  ngOnInit() {}

  backupAccount() {
    this.backupAccountModal.show();
  }

  signOut() {
    this.auth.logout();
    this.router.navigate(['/', 'auth']);
  }
}
