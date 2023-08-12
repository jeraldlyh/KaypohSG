import { Body, Controller, Get, Post } from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { IAuth } from '../auth/auth.types';
import { Contribution } from './contribution.model';
import { ContributionService } from './contribution.service';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get()
  async getAllContribution(): Promise<Contribution[]> {
    return await this.contributionService.getAllContribution();
  }

  @Get('/location')
  async getAllContributionByLocation(
    @Auth() auth: IAuth,
  ): Promise<Contribution[]> {
    const { location } = auth;

    return await this.contributionService.getAllContributionByLocation(
      location,
    );
  }

  @Post()
  async createContribution(
    @Auth() auth: IAuth,
    @Body() contribution: Contribution,
  ): Promise<void> {
    const { username } = auth;

    return await this.contributionService.createContribution(
      username,
      contribution,
    );
  }
}
