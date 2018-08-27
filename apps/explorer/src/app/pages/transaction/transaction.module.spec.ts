import { TransactionModule } from './transaction.module';

describe('TransactionModule', () => {
  let transactionModule: TransactionModule;

  beforeEach(() => {
    transactionModule = new TransactionModule();
  });

  it('should create an instance', () => {
    expect(transactionModule).toBeTruthy();
  });
});
