import { PageContentModule } from './page-content.module';

describe('PageContentModule', () => {
  let pageContentModule: PageContentModule;

  beforeEach(() => {
    pageContentModule = new PageContentModule();
  });

  it('should create an instance', () => {
    expect(pageContentModule).toBeTruthy();
  });
});
