import { Controller, Get, Post, Query, Response } from '@nestjs/common';
import { Response as IResponse } from 'express';
import { Public } from '../common';
import { Auth } from './auth.decorator';
import { AuthService } from './auth.service';
import { IAuth, IJwtTokenPayload, IMyInfoCallback } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @Post('/login')
  //   @Public()
  //   @Redirect()
  //   async singpassLogin(): Promise<IRedirectUrl> {
  //     const url = await this.authService.singpassLogin();
  //     console.log(url);
  //     return { url };
  //   }

  @Get('/callback')
  @Public()
  async callback(
    @Query() query: IMyInfoCallback,
    @Response({ passthrough: true }) response: Partial<IResponse>,
  ): Promise<IJwtTokenPayload> {
    const { account, token } = await this.authService.createAccount(
      query.username,
      query.address,
    );

    response.cookie('accessToken', token, { httpOnly: true });

    return { account, token };
  }

  @Post('/signOut')
  async signOut(
    @Response({ passthrough: true }) response: Partial<IResponse>,
  ): Promise<void> {
    response.clearCookie('accessToken', { httpOnly: true });
  }

  @Post('/validate')
  async validate(@Auth() auth: IAuth): Promise<object> {
    const { iat, exp, ...account } = await this.authService.validateToken(
      auth.token,
    );
    return account;
  }
}
