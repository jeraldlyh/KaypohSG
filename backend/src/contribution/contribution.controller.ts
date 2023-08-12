import { Body, Controller, Get, Post } from '@nestjs/common';
import { Contribution } from './contribution.model';
import { ContributionService } from './contribution.service';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get()
  async getAllContribution(): Promise<Contribution[]> {
    return await this.contributionService.getAllContributionByLocation(
      'Queenstown',
    );
  }

  @Post()
  async createContribution(@Body() contribution: Contribution): Promise<void> {
    return await this.contributionService.createContribution(
      'test',
      'Queenstown',
      contribution,
    );
  }
}
