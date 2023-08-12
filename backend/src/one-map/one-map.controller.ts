import { Controller, Get, Param } from '@nestjs/common';
import { IOneMapResult } from '../auth/auth.types';
import { OneMapService } from './one-map.service';

@Controller('one-map')
export class OneMapController {
  constructor(private readonly oneMapService: OneMapService) {}

  @Get('/:address')
  async searchAddress(@Param('address') address: string): Promise<string> {
    const result = (await this.oneMapService.searchAddress(
      address,
    )) as IOneMapResult;

    return result?.ADDRESS;
  }
}
