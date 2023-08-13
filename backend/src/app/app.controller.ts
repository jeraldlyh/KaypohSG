import { Controller, Get } from '@nestjs/common';
import { Public } from '../common';

@Controller()
export class AppController {
  @Get()
  @Public()
  getHello(): string {
    return 'hello world';
  }
}
