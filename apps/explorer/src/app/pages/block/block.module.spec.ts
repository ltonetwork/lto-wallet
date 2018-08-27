import { BlockModule } from './block.module';

describe('BlockModule', () => {
  let blockModule: BlockModule;

  beforeEach(() => {
    blockModule = new BlockModule();
  });

  it('should create an instance', () => {
    expect(blockModule).toBeTruthy();
  });
});
