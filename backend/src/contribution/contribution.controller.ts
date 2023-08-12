import { Body, Controller, Post } from '@nestjs/common';
import { Contribution } from './contribution.model';
import { ContributionService } from './contribution.service';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Post()
  async createContribution(@Body() contribution: Contribution) {
    return await this.contributionService.createContribution(
      'test',
      contribution,
    );
  }
}
