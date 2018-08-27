import { TransactionsSectionModule } from './transactions-section.module';

describe('TransactionsSectionModule', () => {
  let transactionsSectionModule: TransactionsSectionModule;

  beforeEach(() => {
    transactionsSectionModule = new TransactionsSectionModule();
  });

  it('should create an instance', () => {
    expect(transactionsSectionModule).toBeTruthy();
  });
});
