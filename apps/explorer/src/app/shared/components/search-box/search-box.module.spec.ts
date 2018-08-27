import { SearchBoxModule } from './search-box.module';

describe('SearchBoxModule', () => {
  let searchBoxModule: SearchBoxModule;

  beforeEach(() => {
    searchBoxModule = new SearchBoxModule();
  });

  it('should create an instance', () => {
    expect(searchBoxModule).toBeTruthy();
  });
});
