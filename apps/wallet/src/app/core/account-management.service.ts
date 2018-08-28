import { Injectable, Inject } from '@angular/core';
import { LTO, Account } from 'lto-api';
import { LTO_NETWORK_BYTE } from '@wallet/tokens';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { shareReplay, take, tap } from 'rxjs/operators';

export interface IUserAccount {
  name: string;
  encryptedSeed: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  private readonly _STORAGE_KEY = '_USERS_ACCOUNTS_';

  wallet$: Observable<Account | null>;
  account$: Observable<IUserAccount | null>;

  awailableAccounts$!: Observable<IUserAccount[]>;

  private _wallet$ = new BehaviorSubject<Account | null>(null);
  private _account$ = new BehaviorSubject<IUserAccount | null>(null);
  private _awailableAccounts$: BehaviorSubject<IUserAccount[]>;

  private _ltoInstance: LTO;

  constructor(@Inject(LTO_NETWORK_BYTE) networkBye: string) {
    this._ltoInstance = new LTO(networkBye);

    this.account$ = this._account$.asObservable();
    this.wallet$ = this._wallet$.asObservable();

    this._awailableAccounts$ = new BehaviorSubject(
      JSON.parse(localStorage.getItem(this._STORAGE_KEY) || '[]')
    );

    this.awailableAccounts$ = this._awailableAccounts$.asObservable();

    // Save accounts when updates
    this.awailableAccounts$.subscribe(accounts => this._saveAccounts(accounts));
  }

  async login(userAccount: IUserAccount, password: string): Promise<any> {
    const seed = this._ltoInstance.decryptSeedPhrase(userAccount.encryptedSeed, password);
    const wallet = this._ltoInstance.createAccountFromExistingPhrase(seed);

    this._account$.next(userAccount);
    this._wallet$.next(wallet);
  }

  createAccount(name: string, password: string, wallet: Account): Promise<any> {
    // Add new created account into awailable accounts
    return this.awailableAccounts$
      .pipe(
        take(1),
        tap(accounts => {
          const encryptedSeed = wallet.encryptSeed(password);
          const newAccount = {
            name,
            encryptedSeed
          };
          this._awailableAccounts$.next([...accounts, newAccount]);

          this.login(newAccount, password);
        })
      )
      .toPromise();
  }

  generateWallet(phrase?: string) {
    return phrase
      ? this._ltoInstance.createAccountFromExistingPhrase(phrase)
      : this._ltoInstance.createAccount();
  }

  private _saveAccounts(accounts: IUserAccount[]) {
    localStorage.setItem(this._STORAGE_KEY, JSON.stringify(accounts));
  }
}
