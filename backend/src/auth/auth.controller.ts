import { Controller, Get, Post, Query, Redirect } from '@nestjs/common';
import { IRedirectUrl } from '../common';
import { AuthService } from './auth.service';
import { IQuery } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Redirect()
  async singpassLogin(): Promise<IRedirectUrl> {
    const url = await this.authService.singpassLogin();
    console.log(url);
    return { url };
  }

  @Get('/callback')
  async callback(@Query() query: IQuery): Promise<void> {
    return await this.authService.createAccount(query.username, query.address);
  }
}
