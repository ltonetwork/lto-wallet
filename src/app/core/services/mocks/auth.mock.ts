import { AuthService, IUserAccount } from '../auth.service';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { LTO, Account } from 'lto-api';

import { ILedgerAccount } from '@app/core/services/ledger.service';

export class AuthServiceMock implements AuthService {
  static provider = {
    provide: AuthService,
    useClass: AuthServiceMock,
  };

  readonly STORAGE_KEY: string = 'TEST_KEY';

  authenticated$: Observable<boolean> = of(true);
  wallet$: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
  account$: BehaviorSubject<IUserAccount | null> = new BehaviorSubject<IUserAccount | null>(null);
  ledgerAccount$: BehaviorSubject<ILedgerAccount | null> =
    new BehaviorSubject<ILedgerAccount | null>(null);

  ltoInstance: LTO = {} as any;
  availableAccounts$: Observable<IUserAccount[]> = of([]);

  saveAccount(name: string, password: string, wallet: Account): IUserAccount {
    return {
      name: 'foo',
      encryptedSeed: 'bar',
      address: 'zed',
    };
  }
  generateWallet(phrase?: string): Account {
    return {} as any;
  }

  login(userAccount: IUserAccount, password: string): string {
    return 'foo';
  }

  logout(): void {}
  deleteAccount(account: IUserAccount): void {}
}
