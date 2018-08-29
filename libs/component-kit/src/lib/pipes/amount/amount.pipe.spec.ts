import { AmountPipe } from './amount.pipe';

describe('AmountPipe', () => {
  it('create an instance', () => {
    const pipe = new AmountPipe(100000000);
    expect(pipe).toBeTruthy();
  });
});
