import { Injectable, Inject } from '@angular/core';
import { LTO, Account } from 'lto-api';
import { LTO_NETWORK_BYTE } from '../../tokens';

export interface IUserAccount {
  name: string;
  encryptedSeed: string;
  address: string;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly STORAGE_KEY: string = '_USERS_ACCOUNTS_';

  get authenticated(): boolean {
    return !!this.account;
  }

  account: IUserAccount | null = null;
  wallet!: Account;

  availableAccounts: IUserAccount[];

  ltoInstance: LTO;

  constructor(@Inject(LTO_NETWORK_BYTE) networkBye: string) {
    this.ltoInstance = new LTO(networkBye);

    this.availableAccounts = this.readFromLocalStorage();
  }

  saveAccount(name: string, password: string, wallet: Account): IUserAccount {
    const encryptedSeed = wallet.encryptSeed(password);
    const newAccount: IUserAccount = {
      name,
      encryptedSeed,
      address: wallet.address
    };

    // Save this account in local storage
    this.saveToLocalStorage(newAccount);

    return newAccount;
  }

  generateWallet(phrase?: string) {
    return phrase
      ? this.ltoInstance.createAccountFromExistingPhrase(phrase)
      : this.ltoInstance.createAccount();
  }

  login(userAccount: IUserAccount, password: string): string {
    const seed = this.ltoInstance.decryptSeedPhrase(userAccount.encryptedSeed, password);
    const wallet = this.ltoInstance.createAccountFromExistingPhrase(seed);

    this.account = userAccount;
    this.wallet = wallet;

    return wallet.address;
  }

  logout() {
    this.account = null;
    this.wallet = null as any;
  }

  private readFromLocalStorage(): IUserAccount[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private saveToLocalStorage(account: IUserAccount) {
    const accounts = this.readFromLocalStorage();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...accounts, account]));
  }
}

export abstract class AuthService {
  static provider = {
    provide: AuthService,
    useClass: AuthServiceImpl
  };

  abstract readonly STORAGE_KEY: string;
  abstract availableAccounts: IUserAccount[];
  abstract authenticated: boolean;
  abstract wallet: Account;
  abstract ltoInstance: LTO;

  abstract saveAccount(name: string, password: string, wallet: Account): IUserAccount;
  abstract generateWallet(phrase?: string): Account;
  abstract login(userAccount: IUserAccount, password: string): string;
  abstract logout(): void;
}
