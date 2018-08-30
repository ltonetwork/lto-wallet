import { LinksOutletModule } from './links-outlet.module';

describe('LinksOutletModule', () => {
  let linksOutletModule: LinksOutletModule;

  beforeEach(() => {
    linksOutletModule = new LinksOutletModule();
  });

  it('should create an instance', () => {
    expect(linksOutletModule).toBeTruthy();
  });
});
