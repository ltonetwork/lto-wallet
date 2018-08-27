import { BlocksModule } from './blocks.module';

describe('BlocksModule', () => {
  let blocksModule: BlocksModule;

  beforeEach(() => {
    blocksModule = new BlocksModule();
  });

  it('should create an instance', () => {
    expect(blocksModule).toBeTruthy();
  });
});
