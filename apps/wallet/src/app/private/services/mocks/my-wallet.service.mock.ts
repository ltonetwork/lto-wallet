import { MyWallet } from '../my-wallet.service';
import { Observable, of } from 'rxjs';

export class MyWalletMock implements MyWallet {
  balance$: Observable<any> = of({});

  // Transactions history
  transactions$: Observable<any[]> = of([]);
  leasingTransactions$: Observable<any[]> = of([]);
  dataTransactions$: Observable<any[]> = of([]);
  transfers$: Observable<any[]> = of([]);
  anchors$: Observable<any[]> = of([]);

  // Unconfirmed transactrions
  uncofirmed$: Observable<any[]> = of([]);
  unconfirmedLeasing$: Observable<any[]> = of([]);
  groupedTransfers$: Observable<any[]> = of([]);

  async transfer(data: any): Promise<void> {}
  async lease(recipient: string, amount: number, fee: number): Promise<any> {}
  async cancelLease(transactionId: string): Promise<any> {}
  async withdraw(address: string, ammount: number, fee: number): Promise<any> {}
}
