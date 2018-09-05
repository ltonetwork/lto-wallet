import { Injectable, Inject } from '@angular/core';
import { LTO, Account } from 'lto-api';
import { LTO_NETWORK_BYTE } from '@wallet/tokens';
import { Observable, BehaviorSubject } from 'rxjs';
import { take, tap, switchMap, filter } from 'rxjs/operators';

export interface IUserAccount {
  name: string;
  encryptedSeed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  private readonly _STORAGE_KEY = '_USERS_ACCOUNTS_';

  wallet$: Observable<Account>;
  account$: Observable<IUserAccount | null>;

  awailableAccounts$!: Observable<IUserAccount[]>;

  private _wallet$ = new BehaviorSubject<Account | null>(null);
  private _account$ = new BehaviorSubject<IUserAccount | null>(null);
  private _awailableAccounts$: BehaviorSubject<IUserAccount[]>;

  public ltoInstance: LTO;

  constructor(@Inject(LTO_NETWORK_BYTE) networkBye: string) {
    this.ltoInstance = new LTO(networkBye);

    this.account$ = this._account$.asObservable();
    this.wallet$ = this._wallet$.asObservable().pipe(filter((w): w is Account => !!w));

    this._awailableAccounts$ = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this._STORAGE_KEY) || '[]')
    );

    this.awailableAccounts$ = this._awailableAccounts$.asObservable();

    // Save accounts when updates
    this.awailableAccounts$.subscribe(accounts => this._saveAccounts(accounts));
  }

  async login(userAccount: IUserAccount, password: string): Promise<string> {
    const seed = this.ltoInstance.decryptSeedPhrase(userAccount.encryptedSeed, password);
    const wallet = this.ltoInstance.createAccountFromExistingPhrase(seed);

    this._account$.next(userAccount);
    this._wallet$.next(wallet);

    return wallet.address;
  }

  createAccount(name: string, password: string, wallet: Account): Promise<string> {
    // Add new created account into awailable accounts
    return this.awailableAccounts$
      .pipe(
        take(1),
        switchMap(accounts => {
          const encryptedSeed = wallet.encryptSeed(password);
          const newAccount = {
            name,
            encryptedSeed
          };
          this._awailableAccounts$.next([...accounts, newAccount]);

          return this.login(newAccount, password);
        })
      )
      .toPromise();
  }

  generateWallet(phrase?: string) {
    return phrase
      ? this.ltoInstance.createAccountFromExistingPhrase(phrase)
      : this.ltoInstance.createAccount();
  }

  private _saveAccounts(accounts: IUserAccount[]) {
    localStorage.setItem(this._STORAGE_KEY, JSON.stringify(accounts));
  }
}
