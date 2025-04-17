import { map } from 'rxjs/operators';
import LTO from '@ltonetwork/lto';
import { Account } from '@ltonetwork/lto/accounts';
import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber, combineLatest } from 'rxjs';

import { LTO_NETWORK_BYTE, LTO_PUBLIC_API } from '@app/tokens';
import { ILedgerAccount, LedgerService } from '@app/core/services/ledger.service';
import { MobileAuthService } from '@app/core/services/mobile-auth.service';
import { WalletConnectService } from '@app/core';

export interface IUserAccount {
  name: string;
  encryptedSeed?: string;
  address: string;
  privateKey?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly STORAGE_KEY: string = '_USERS_ACCOUNTS_';
  readonly SESSION_KEY: string = '_LTO_ACCOUNT_';

  authenticated$: Observable<boolean>;
  account$: Observable<IUserAccount | null>;
  wallet$ = new BehaviorSubject<Account | null>(null);
  localAccount$ = new BehaviorSubject<IUserAccount | null>(null);
  ledgerAccount$ = new BehaviorSubject<ILedgerAccount | null>(null);

  lto: LTO;
  availableAccounts$: Observable<IUserAccount[]>;
  private _availableAccounts$: Subscriber<IUserAccount[]> | null = null;

  constructor(
    @Inject(LTO_NETWORK_BYTE) networkByte: string,
    @Inject(LTO_PUBLIC_API) publicApi: string,
    private ledger: LedgerService,
    private mobileAuth: MobileAuthService,
    private walletConnect: WalletConnectService,
  ) {
    this.lto = new LTO(networkByte);
    this.lto.nodeAddress = publicApi.replace(/\/$/, '');

    // Create Observable to give latest data on every subscription
    this.availableAccounts$ = new Observable((subscriber) => {
      this._availableAccounts$ = subscriber;
      subscriber.next(this.readFromLocalStorage());
    });

    this.authenticated$ = combineLatest([this.wallet$, this.ledger.connected$, this.mobileAuth.account$, this.walletConnect.session$]).pipe(
      map(([wallet, ledgerConnected, mobileAccount, walletConnectSession]) => !!wallet || ledgerConnected || !!mobileAccount || !!walletConnectSession)
    );

    this.account$ = combineLatest([this.localAccount$, this.ledger.ledgerAccount$, this.mobileAuth.account$, this.walletConnect.account$]).pipe(
      map(([localAccount, ledgerAccount, mobileAccount, walletConnectAccount]) =>
        localAccount ||
        (ledgerAccount ? { name: ledgerAccount.name + ' @ ledger', address: ledgerAccount.address } : null) ||
        (mobileAccount ? { name: 'LTO Universal wallet', address: mobileAccount.address } : null) ||
        (walletConnectAccount ? { name: 'WalletConnect', address: walletConnectAccount.address } : null)
      )
    );

    this.ledgerAccount$ = this.ledger.ledgerAccount$;

    this.loadSession();
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
    return this.lto.account({ seed: phrase });
  }

  login(userAccount: IUserAccount, password: string): string {
    let wallet: Account;

    if (userAccount.encryptedSeed) {
      wallet = this.lto.account({ seed: userAccount.encryptedSeed, seedPassword: password });
    } else if (userAccount.privateKey) {
      wallet = this.lto.account({ privateKey: userAccount.privateKey });
    } else {
      throw new Error('Seed missing');
    }

    this.localAccount$.next(userAccount);
    this.wallet$.next(wallet);

    this.saveSession();

    return wallet.address;
  }

  logout() {
    this.localAccount$.next(null);
    this.wallet$.next(null);
    this.mobileAuth.account$.next(null);
    this.ledger.disconnect().then();
    this.walletConnect.disconnect().then();

    this.saveSession();
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

  private saveSession() {
    const userAccount = this.localAccount$.getValue();
    const wallet = this.wallet$.getValue();

    if (userAccount && wallet) {
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({ ...userAccount, seed: wallet.seed }));
    } else {
      sessionStorage.removeItem(this.SESSION_KEY);
    }
  }

  private loadSession() {
    const sessionData = sessionStorage.getItem(this.SESSION_KEY);

    if (!sessionData) {
      return;
    }

    const { seed, ...userAccount } = JSON.parse(sessionData);
    const wallet = this.lto.account({ seed });

    this.localAccount$.next(userAccount);
    this.wallet$.next(wallet);
  }
}
