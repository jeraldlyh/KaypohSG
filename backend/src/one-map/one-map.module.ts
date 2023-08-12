import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OneMapController } from './one-map.controller';
import { OneMapService } from './one-map.service';

@Module({
  imports: [HttpModule],
  controllers: [OneMapController],
  providers: [OneMapService],
  exports: [OneMapService],
})
export class OneMapModule {}
