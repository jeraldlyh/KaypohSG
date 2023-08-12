import { Injectable } from '@nestjs/common';
import { Contribution } from './contribution.model';
import { ContributionRepository } from './contribution.repository';

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
  ) {}

  async getAllContributionByLocation(
    location: string,
  ): Promise<Contribution[]> {
    return await this.contributionRepository.getAllContributionByLocation(
      location,
    );
  }

  async createContribution(
    username: string,
    location: string,
    contribution: Contribution,
  ) {
    contribution.createdBy = username;
    contribution.location = location;

    return await this.contributionRepository.createContribution(contribution);
  }
}
