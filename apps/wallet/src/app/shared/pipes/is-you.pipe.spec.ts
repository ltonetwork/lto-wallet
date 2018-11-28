import { IsYouPipe } from './is-you.pipe';
import { AuthServiceMock } from '../../core/mocks';
import { AuthService } from '../../core';

describe('IsYouPipe', () => {
  let authMock: AuthService;
  beforeEach(() => {
    authMock = new AuthServiceMock();
  });

  it('create an instance', () => {
    const pipe = new IsYouPipe(authMock);
    expect(pipe).toBeTruthy();
  });
});
