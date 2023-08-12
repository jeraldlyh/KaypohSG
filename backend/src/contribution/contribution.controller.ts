import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Auth } from '../auth/auth.decorator';
import { IAuth } from '../auth/auth.types';
import { Contribution } from './contribution.model';
import { ContributionService } from './contribution.service';
import { IGetContribution } from './contribution.types';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get()
  async getAllContribution(@Auth() auth: IAuth): Promise<IGetContribution[]> {
    return await this.contributionService.getAll(auth.username);
  }

  @Get('/location')
  async getAllByLocation(@Auth() auth: IAuth): Promise<IGetContribution[]> {
    const { location, username } = auth;

    return await this.contributionService.getAllByLocation(username, location);
  }

  @Post()
  async create(
    @Auth() auth: IAuth,
    @Body() contribution: Contribution,
  ): Promise<void> {
    const { username, location } = auth;

    return await this.contributionService.create(
      username,
      location,
      contribution,
    );
  }

  @Get('/like/:id')
  async like(@Auth() auth: IAuth, @Param('id') id: string): Promise<void> {
    const { username } = auth;

    return await this.contributionService.like(username, id);
  }

  @Get('/dislike/:id')
  async dislike(@Auth() auth: IAuth, @Param('id') id: string): Promise<void> {
    const { username } = auth;

    return await this.contributionService.dislike(username, id);
  }
}
