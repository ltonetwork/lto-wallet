import { KeyvalueListModule } from './keyvalue-list.module';

describe('KeyvalueListModule', () => {
  let keyvalueListModule: KeyvalueListModule;

  beforeEach(() => {
    keyvalueListModule = new KeyvalueListModule();
  });

  it('should create an instance', () => {
    expect(keyvalueListModule).toBeTruthy();
  });
});
