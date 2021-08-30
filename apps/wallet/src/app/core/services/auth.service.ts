import { map, tap } from 'rxjs/operators';
import { LTO, Account } from 'lto-api';
import { Injectable, Inject, ClassProvider, Injector } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber, combineLatest } from 'rxjs';

import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@wallet/tokens';
import { ILedgerAccount, LedgerService } from '@wallet/core/services/ledger.service';

export interface IUserAccount {
  name: string;
  encryptedSeed: string;
  address: string;
  privateKey?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServiceImpl implements AuthService {
  readonly STORAGE_KEY: string = '_USERS_ACCOUNTS_';

  authenticated$: Observable<boolean>;
  wallet$: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  account$: BehaviorSubject<IUserAccount | null> = new BehaviorSubject<IUserAccount | null>(null);
  ledgerAccount$: BehaviorSubject<ILedgerAccount | null> = new BehaviorSubject<ILedgerAccount | null>(null);

  ltoInstance: LTO;
  availableAccounts$: Observable<IUserAccount[]>;
  private _availableAccounts$: Subscriber<IUserAccount[]> | null = null;

  constructor(
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    @Inject(LTO_PUBLIC_API) publicApi: string,
    private _injector: Injector,
    private ledger: LedgerService,
  ) {
    this.ltoInstance = new LTO(networkByte, publicApi.replace(/\/$/, ''));

    // Create Observable to give latest data on every subscription
    this.availableAccounts$ = new Observable((subscriber) => {
      this._availableAccounts$ = subscriber;
      subscriber.next(this.readFromLocalStorage());
    });

    this.authenticated$ = combineLatest(this.wallet$, this.ledger.connected$).pipe(
      map(([wallet, ledgerConnected]) => !!wallet || !!ledgerConnected)
    );

    this.ledger.connected$.subscribe(async connected => {
      if (connected) {
        // @todo: get accounts from differenty IDs (0-10)
        const ledgerData = await this.ledger.getUserDataById(0);
        this.ledgerAccount$.next(ledgerData);
      }
    });
  }

  saveAccount(name: string, password: string, wallet: Account): IUserAccount {
    const encryptedSeed = wallet.encryptSeed(password);
    const newAccount: IUserAccount = {
      name,
      encryptedSeed,
      address: wallet.address,
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
    let wallet: Account;

    if (userAccount.encryptedSeed) {
      const seed = this.ltoInstance.decryptSeedPhrase(userAccount.encryptedSeed, password);
      wallet = this.ltoInstance.createAccountFromExistingPhrase(seed);
    } else if (userAccount.privateKey) {
      wallet = this.ltoInstance.createAccountFromPrivateKey(userAccount.privateKey);
    } else {
      throw new Error('Seed missing');
    }

    this.account$.next(userAccount);
    this.wallet$.next(wallet);

    return wallet.address;
  }

  logout() {
    this.account$.next(null);
    this.wallet$.next(null);
    this.ledgerAccount$.next(null);
    this.ledger.disconnect();
  }

  deleteAccount(account: IUserAccount) {
    const newAccounts = this.deleteFromLocalStorage(account);
    if (this._availableAccounts$) {
      // Update available accounts observable to display changes
      this._availableAccounts$.next(newAccounts);
    }
  }

  private readFromLocalStorage(): IUserAccount[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  private saveToLocalStorage(account: IUserAccount) {
    const accounts = this.readFromLocalStorage();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify([...accounts, account]));
  }

  private deleteFromLocalStorage(account: IUserAccount): IUserAccount[] {
    const accounts = this.readFromLocalStorage();
    const newAccounts = accounts.filter((a) => a.address !== account.address);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newAccounts));
    return newAccounts;
  }
}

export abstract class AuthService {
  static provider: ClassProvider = {
    provide: AuthService,
    useClass: AuthServiceImpl,
  };

  abstract readonly STORAGE_KEY: string;

  abstract authenticated$: Observable<boolean>;
  abstract wallet$: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  abstract account$: BehaviorSubject<IUserAccount | null> = new BehaviorSubject<IUserAccount | null>(null);
  abstract ledgerAccount$: BehaviorSubject<ILedgerAccount | null> = new BehaviorSubject<ILedgerAccount | null>(null);

  abstract ltoInstance: LTO;
  abstract availableAccounts$: Observable<IUserAccount[]>;

  abstract saveAccount(name: string, password: string, wallet: Account): IUserAccount;
  abstract generateWallet(phrase?: string): Account;
  abstract login(userAccount: IUserAccount, password: string): string;
  abstract logout(): void;
  abstract deleteAccount(account: IUserAccount): void;
}
