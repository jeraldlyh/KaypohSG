import { Controller, Get, Param } from '@nestjs/common';
import { ICoordinates } from '../auth/auth.types';
import { OneMapService } from './one-map.service';

@Controller('one-map')
export class OneMapController {
  constructor(private readonly oneMapService: OneMapService) {}

  @Get('/search/:address')
  async searchAddress(
    @Param('address') address: string,
  ): Promise<ICoordinates[]> {
    const result = await this.oneMapService.searchAddress(address);

    return result;
  }
}
