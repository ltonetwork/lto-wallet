import { PublicOutletModule } from './public-outlet.module';

describe('PublicOutletModule', () => {
  let publicOutletModule: PublicOutletModule;

  beforeEach(() => {
    publicOutletModule = new PublicOutletModule();
  });

  it('should create an instance', () => {
    expect(publicOutletModule).toBeTruthy();
  });
});
