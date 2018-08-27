import { BlocksListModule } from './blocks-list.module';

describe('BlocksListModule', () => {
  let blocksListModule: BlocksListModule;

  beforeEach(() => {
    blocksListModule = new BlocksListModule();
  });

  it('should create an instance', () => {
    expect(blocksListModule).toBeTruthy();
  });
});
