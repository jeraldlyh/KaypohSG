import { ExecutionContext } from '@nestjs/common';
import { Account } from '../auth.model';
import { IAuth, IJwtTokenPayload, IMyInfoCallback } from '../auth.types';

export const AuthGuardMock = {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    request['account'] = { username: 'user' };

    return true;
  },
};

export const AccountStub = (): Account => ({
  id: '0',
  createdAt: new Date(),
  isDeleted: false,
  username: 'test',
  location: {
    lat: '123',
    lng: '456',
  },
});

export const AuthStub = (): IAuth => ({
  ...AccountStub(),
  iat: '123',
  exp: '123',
  token: '123',
});

export const SingpassCallbackStub = (): IMyInfoCallback => ({
  username: 'test',
  address: 'test',
});

export const JwtTokenStub = (): string => 'test';

export const JwtTokenPayloadStub = (): IJwtTokenPayload => ({
  account: AccountStub(),
  token: JwtTokenStub(),
});
