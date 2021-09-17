import { BehaviorSubject } from 'rxjs';
import { ILedgerAccount, IUnsignedTransaction, LedgerService } from '../ledger.service';

export class LedgerServiceMock implements LedgerService {
  static provider = {
    provide: LedgerService,
    useClass: LedgerServiceMock
  };

  ledgerId: number = 0;
  connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ledgerAccount$: BehaviorSubject<ILedgerAccount | null> = new BehaviorSubject<ILedgerAccount | null>(null);

  async connect(): Promise<void> {};

  async disconnect(): Promise<void> {};

  async updateUserData(): Promise<void> {};

  async signAndBroadcast(data: IUnsignedTransaction): Promise<void> {};
}
