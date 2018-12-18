import { Component, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';
import { AuthService, IUserAccount, toPromise } from '../core';
import { Router } from '@angular/router';
import { DeleteAccountDialogComponent } from '../components/delete-account-dialog/delete-account-dialog.component';

@Component({
  selector: 'lto-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  availableAccounts$: Observable<IUserAccount[]>;
  selected$: ReplaySubject<IUserAccount> = new ReplaySubject();

  constructor(
    private auth: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private matDialog: MatDialog
  ) {
    this.availableAccounts$ = auth.availableAccounts$;
  }

  ngOnInit() {
    this.availableAccounts$.pipe(take(1)).subscribe(accounts => {
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
      console.log(err);
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
}
