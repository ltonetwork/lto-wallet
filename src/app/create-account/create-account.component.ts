import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService, IUserAccount } from '../core';
import { Account } from '@ltonetwork/lto';
import { Router } from '@angular/router';

@Component({
    selector: 'lto-create-account',
    templateUrl: './create-account.component.html',
    styleUrls: ['./create-account.component.scss'],
    standalone: false
})
export class CreateAccountComponent implements OnInit {
  wallet: Account;

  @ViewChild('step1Tpl', { static: true }) step1!: TemplateRef<any>;
  @ViewChild('step2Tpl', { static: true }) step2!: TemplateRef<any>;
  @ViewChild('step3Tpl', { static: true }) step3!: TemplateRef<any>;
  @ViewChild('step4Tpl', { static: true }) step4!: TemplateRef<any>;

  stepTemplate!: TemplateRef<any>;

  get seedWords(): string[] {
    return this.wallet.seed?.split(' ') ?? [];
  }

  selectedWords: string[] = [];
  shuffledWords: string[] = [];

  private _selectedWordsIndexes: { [key: number]: boolean } = {};

  get getAvailableWords(): string[] {
    return [];
  }

  get invalid(): boolean {
    return this.wallet.seed !== this.selectedWords.join(' ');
  }

  get finished(): boolean {
    return this.selectedWords.length === this.seedWords.length;
  }

  /**
   * We login after user confirms that he wrote down seed.
   * So we need to save account and password for later use;
   */
  private _account: IUserAccount | null = null;
  private _password = '';

  constructor(private auth: AuthService, private router: Router) {
    this.wallet = auth.generateWallet();
  }

  ngOnInit() {
    this.stepTemplate = this.step1;
  }

  goToStep(step: number) {
    switch (step) {
      case 1:
        return (this.stepTemplate = this.step1);
      case 2:
        return (this.stepTemplate = this.step2);
      case 3:
        return (this.stepTemplate = this.step3);
      case 4:
        return (this.stepTemplate = this.step4);
    }
  }

  saveAccount(credentials: { accountName: string; password: string }) {
    try {
      this._account = this.auth.saveAccount(
        credentials.accountName,
        credentials.password,
        this.wallet
      );
      this._password = credentials.password;
      // this.auth.login(account, credentials.password);
      this.goToStep(3);
    } catch (err) {
      console.error(err);
    }
  }

  selectWord(word: string, index: number) {
    this.selectedWords.push(word);
    this._selectedWordsIndexes[index] = true;
  }

  resetConfirmation() {
    this.shuffledWords = this.wallet.seed
      ?.split(' ')
      .sort(() => (Math.random() * 100 > 50 ? -1 : 1)) ?? [];
    this.selectedWords = [];
    this._selectedWordsIndexes = {};
  }

  isSelected(index: number): boolean {
    return this._selectedWordsIndexes[index];
  }

  toConfirmationStep() {
    this.resetConfirmation();
    this.goToStep(4);
  }

  loginAndGoHome() {
    if (!this._account) {
      throw new Error('No account found');
    }

    this.auth.login(this._account, this._password);
    this.router.navigate(['/']);
  }
}
