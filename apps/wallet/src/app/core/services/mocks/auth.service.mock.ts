import { AuthService } from '../auth.service';
import { Account, LTO } from 'lto-api';

export class AuthServiceMock implements AuthService {
  STORAGE_KEY = '_USERS_ACCOUNTS_';
  availableAccounts = [];
  authenticated = false;
  wallet = new Account();
  ltoInstance = {} as any;

  saveAccount() {
    return {} as any;
  }

  generateWallet() {
    return new Account();
  }

  login() {
    return '';
  }

  logout() {}
}
