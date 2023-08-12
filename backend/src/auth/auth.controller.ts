import {
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Response,
} from '@nestjs/common';
import { Response as IResponse } from 'express';
import { IRedirectUrl, Public } from '../common';
import { AuthService } from './auth.service';
import { IQuery } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Public()
  @Redirect()
  async singpassLogin(): Promise<IRedirectUrl> {
    const url = await this.authService.singpassLogin();
    console.log(url);
    return { url };
  }

  @Get('/callback')
  @Public()
  async callback(
    @Query() query: IQuery,
    @Response({ passthrough: true }) response: IResponse,
  ): Promise<void> {
    const token = await this.authService.createAccount(
      query.username,
      query.address,
    );

    response.cookie('accessToken', token, { httpOnly: true });
  }

  @Post('/logout')
  async logout(
    @Response({ passthrough: true }) response: IResponse,
  ): Promise<void> {
    response.clearCookie('accessToken', { httpOnly: true });
  }
}
