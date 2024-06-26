import { IAnchorPayload, ILeasePayload, IMassTransferPayload, ITransferPayload, WalletService } from '../wallet.service';
import { of } from 'rxjs';

export class WalletServiceMock implements WalletService {
  static provider = {
    provide: WalletService,
    useClass: WalletServiceMock
  };

  balance$ = of({
    regular: 0,
    generating: 0,
    available: 0,
    effective: 0,
    leasing: 0,
    unbonding: 0,
    amountDivider: 1
  });
  transferFee$ = of(0.75);

  address$ = of('test_address');
  canSign$ = of(true);

  transactions$ = of([]);
  leasingTransactions$ = of([]);
  dataTransactions$ = of([]);
  transfers$ = of({
    total: 0,
    items: []
  });
  anchors$ = of({
    total: 0,
    items: []
  });

  async transfer() {}
  async massTransfer() {}
  async lease() {}
  async cancelLease() {}
  async withdraw() {}
  async anchor() {}

  prepareAnchor = (data: IAnchorPayload) => ({});
  prepareCancelLease = (transactionId: string) => ({});
  prepareLease = (data: ILeasePayload) => ({});
  prepareMassTransfer = (data: IMassTransferPayload) => ({});
  prepareTransfer = (data: ITransferPayload) => ({});
}
