import { AmountDividePipe } from './amount-divide.pipe';

describe('AmountDividePipe', () => {
  it('create an instance', () => {
    const pipe = new AmountDividePipe(1000);
    expect(pipe).toBeTruthy();
  });
});
