import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core';
import { MatHorizontalStepper } from '@angular/material';
import { Account } from 'lto-api';
import { IAccountCredentials } from '../components/credentials-form/credentials-form.component';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CrendetialsFormComponent } from '../components';

@Component({
  selector: 'lto-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild(MatHorizontalStepper) stepper!: MatHorizontalStepper;
  @ViewChild('credentialsForm') credentialsForm!: CrendetialsFormComponent;

  /**
   * Random wallt which will be offered to user
   */
  wallet: Account;

  get progress(): number {
    return this.stepper ? (this.stepper.selectedIndex / 2) * 100 : 0;
  }

  get cannotContinue(): boolean {
    if (this.stepper.selectedIndex === 1) {
      return this.credentialsForm.invalid;
    }

    return false;
  }

  constructor(private auth: AuthService, private snackbar: MatSnackBar, private router: Router) {
    this.wallet = auth.generateWallet();
  }

  ngOnInit() {}

  saveAccount(credentials: IAccountCredentials) {
    try {
      const account = this.auth.saveAccount(
        credentials.accountName,
        credentials.password,
        this.wallet
      );
      this.auth.login(account, credentials.password);
      this.notify('Account saved on this device');
      this.stepper.next();
    } catch (error) {
      this.notify('Cannot save account on this device');
      console.error(error);
    }
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  async continue() {
    if (this.stepper.selectedIndex === 1) {
      await this.saveAccount(this.credentialsForm.value);
    }
    this.stepper.next();
  }

  private notify(message: string) {
    this.snackbar.open(message, 'Dismiss', {
      duration: 3000
    });
  }
}
