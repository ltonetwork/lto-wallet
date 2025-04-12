import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IMobileAuthChallenge, MobileAuthService } from '../../core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
    selector: 'lto-mobile-auth-modal',
    templateUrl: './mobile-auth-modal.component.html',
    styleUrls: ['./mobile-auth-modal.component.scss'],
    standalone: false
})
export class MobileAuthModalComponent implements OnInit {
  public challenge$: Observable<IMobileAuthChallenge|null>;

  constructor(
    private dialog: MatDialogRef<any>,
    private mobileAuth: MobileAuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
    this.challenge$ = this.mobileAuth.challenge$;
  }

  ngOnInit() {
    this.challenge$.subscribe({
      error: error => {
        this.snackbar.open('Unable to sign in using mobile wallet', 'Dismiss', { duration: 3000 });
        this.dialog.close();
      }
    });

    this.mobileAuth.account$.subscribe({
      next: async account => {
        if (!account) return;

        await this.router.navigate(['/']);
        this.dialog.close();
      }
    });

    this.mobileAuth.connect();
  }
}
