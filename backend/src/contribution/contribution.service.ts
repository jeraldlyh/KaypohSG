import { Injectable } from '@nestjs/common';
import { ICoordinates } from '../auth/auth.types';
import { Contribution } from './contribution.model';
import { ContributionRepository } from './contribution.repository';

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
  ) {}

  async getAllContribution(): Promise<Contribution[]> {
    return await this.contributionRepository.getAllContribution();
  }

  async getAllContributionByLocation(
    location: ICoordinates,
  ): Promise<Contribution[]> {
    const contributions =
      await this.contributionRepository.getAllContribution();

    return contributions.filter((contribution) =>
      this._isWithinAcceptableRadius(location, contribution.location),
    );
  }

  async createContribution(username: string, contribution: Contribution) {
    contribution.createdBy = username;

    return await this.contributionRepository.createContribution(contribution);
  }

  // NOTE: Ideally to retrieve by town
  _isWithinAcceptableRadius(
    source: ICoordinates,
    destination: ICoordinates,
  ): boolean {
    const expectedY = 0.006;
    const expectedX = 0.005;

    const computedX = Math.abs(+source.lng - +destination.lng);
    const computedY = Math.abs(+source.lat - +destination.lat);

    return computedX <= expectedX && computedY <= expectedY;
  }
}
