import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { AuthService } from '../core';
import { Account } from 'lto-api';

@Component({
  selector: 'lto-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  wallet: Account;

  @ViewChild('step1Tpl') step1!: TemplateRef<any>;
  @ViewChild('step2Tpl') step2!: TemplateRef<any>;
  @ViewChild('step3Tpl') step3!: TemplateRef<any>;
  @ViewChild('step4Tpl') step4!: TemplateRef<any>;

  stepTemplate!: TemplateRef<any>;

  get seedWords(): string[] {
    return this.wallet.seed.split(' ');
  }

  selectedWords: string[] = [];
  shuffledWords: string[] = [];

  get getAvailableWords(): string[] {
    return [];
  }

  get invalid(): boolean {
    return this.wallet.seed !== this.selectedWords.join(' ');
  }

  get finished(): boolean {
    return this.selectedWords.length === this.seedWords.length;
  }

  constructor(private auth: AuthService) {
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
      const account = this.auth.saveAccount(
        credentials.accountName,
        credentials.password,
        this.wallet
      );
      this.auth.login(account, credentials.password);
      this.goToStep(3);
    } catch (err) {
      console.log(err);
    }
  }

  selectWord(word: string) {
    this.selectedWords.push(word);
  }

  resetConfirmation() {
    this.shuffledWords = this.wallet.seed
      .split(' ')
      .sort(() => (Math.random() * 100 > 50 ? -1 : 1));
    this.selectedWords = [];
  }

  isSelected(word: string): boolean {
    return this.selectedWords.indexOf(word) !== -1;
  }

  toConfirmationStep() {
    this.resetConfirmation();
    this.goToStep(4);
  }
}
