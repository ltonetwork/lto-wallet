import { BehaviorSubject } from 'rxjs';
import { ILedgerAccount, IUnsignedTransaction, LedgerService } from '../ledger.service';

export class LedgerServiceMock implements LedgerService {
  static provider = {
    provide: LedgerService,
    useClass: LedgerServiceMock
  };

  userId: number = 0;
  userData?: ILedgerAccount;
  connected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  async connect(): Promise<void> {};

  async disconnect(): Promise<void> {};

  async signAndBroadcast(data: IUnsignedTransaction): Promise<void> {};
}
