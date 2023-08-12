import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuth } from './auth.types';

export const Auth = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): IAuth => {
    const request = ctx.switchToHttp().getRequest();

    return { ...request.account, token: request.token };
  },
);
