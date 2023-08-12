import { Module } from '@nestjs/common';
import { ContributionController } from './contribution.controller';
import { ContributionRepository } from './contribution.repository';
import { ContributionService } from './contribution.service';

@Module({
  controllers: [ContributionController],
  providers: [ContributionService, ContributionRepository],
})
export class ContributionModule {}
