import { Injectable } from '@nestjs/common';
import { Contribution } from './contribution.model';
import { ContributionRepository } from './contribution.repository';

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
  ) {}

  async createContribution(username: string, contribution: Contribution) {
    contribution.createdBy = username;

    return await this.contributionRepository.createContribution(contribution);
  }
}
