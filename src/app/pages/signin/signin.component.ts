import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { AuthService, IUserAccount, toPromise, LedgerService } from '../../core';
import { Router } from '@angular/router';
import { DeleteAccountDialogComponent } from '../../components/delete-account-dialog/delete-account-dialog.component';
import { MobileAuthModal } from '@app/modals/mobile-auth-modal';

@Component({
    selector: 'lto-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: false
})
export class SigninComponent implements OnInit {
  availableAccounts$: Observable<IUserAccount[]>;
  selected$: ReplaySubject<IUserAccount> = new ReplaySubject(1);

  constructor(
    private auth: AuthService,
    private ledger: LedgerService,
    private snackbar: MatSnackBar,
    private router: Router,
    private matDialog: MatDialog,
    private mobileAuthModal: MobileAuthModal
  ) {
    this.availableAccounts$ = auth.availableAccounts$;
  }

  ngOnInit() {
    this.availableAccounts$.pipe(take(1)).subscribe((accounts) => {
      this.selected$.next(accounts[0]);
    });
  }

  select(account: IUserAccount) {
    this.selected$.next(account);
  }

  async signin(password: string) {
    const selected = await toPromise(this.selected$);
    try {
      this.auth.login(selected, password);
      this.snackbar.open('Logged in', 'Dismiss', { duration: 3000 });
      this.router.navigate(['/']);
    } catch (err) {
      console.error(err);
      this.snackbar.open('Invalid password', 'Dismiss', { duration: 3000 });
    }
  }

  async deleteAccount(account: IUserAccount, event: Event) {
    event.stopPropagation();
    const confirmDelete = await toPromise(
      this.matDialog.open(DeleteAccountDialogComponent).afterClosed()
    );

    if (confirmDelete) {
      this.auth.deleteAccount(account);
    }
  }

  async mobileLogin() {
    await this.mobileAuthModal.show();
  }

  async ledgerLogin() {
    try {
      await this.ledger.connect();

      this.snackbar.open('Logged in via Ledger', 'Dismiss', { duration: 3000 });
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error while connecting to ledger: ', error);

      if (error.statusCode === 26628) {
        this.snackbar.open('Ledger device: Transport error, unlock device and try again (0x6804)', 'Dismiss', { duration: 6000 });
        return;
      }

      this.snackbar.open(error.message, 'Dismiss', { duration: 6000 });
    }
  }
}
