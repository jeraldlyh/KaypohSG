import { Controller, Post, Redirect } from '@nestjs/common';
import { IRedirectUrl } from '../common';
import { AuthService } from './auth.service';

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
}
