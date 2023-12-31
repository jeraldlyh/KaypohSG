import { BadRequestException, Injectable } from '@nestjs/common';
import { ICoordinates } from '../auth/auth.types';
import { ContributionRepository } from './contribution.repository';
import { IContribution, IGetContribution } from './contribution.types';

@Injectable()
export class ContributionService {
  constructor(
    private readonly contributionRepository: ContributionRepository,
  ) {}

  async getAll(username: string): Promise<IGetContribution[]> {
    const contributions = await this.contributionRepository.getAll();

    return this._appendUserActions(contributions, username);
  }

  async getAllByLocation(
    username: string,
    location: ICoordinates,
  ): Promise<IGetContribution[]> {
    const contributions = await this.contributionRepository.getAll();

    const filteredContributions = contributions.filter((contribution) =>
      this._isWithinAcceptableRadius(location, contribution.location),
    );

    return this._appendUserActions(filteredContributions, username);
  }

  async create(
    username: string,
    location: ICoordinates,
    contribution: IContribution,
  ): Promise<void> {
    contribution.createdBy = username;

    if (!this._isWithinAcceptableRadius(location, contribution.location)) {
      throw new BadRequestException(
        'You are only allowed to contribute to your vicinity marked by the dotted circle',
      );
    }

    return await this.contributionRepository.create(contribution);
  }

  async like(username: string, id: string): Promise<void> {
    return await this.contributionRepository.updateLikes(username, id);
  }

  async dislike(username: string, id: string): Promise<void> {
    return await this.contributionRepository.updateLikes(username, id, true);
  }

  // NOTE: Ideally to retrieve by town
  _isWithinAcceptableRadius(
    source: ICoordinates,
    destination: ICoordinates,
  ): boolean {
    // NOTE: Forms an estimated 5km radius
    const expectedY = 0.006;
    const expectedX = 0.005;

    const computedX = Math.abs(+source.lng - +destination.lng);
    const computedY = Math.abs(+source.lat - +destination.lat);

    return computedX <= expectedX && computedY <= expectedY;
  }

  _appendUserActions(
    contributions: IContribution[],
    username: string,
  ): IGetContribution[] {
    return contributions.map((contribution) => {
      return {
        ...contribution,
        actions: {
          isLiked: contribution.likes.includes(username),
          isDisliked: contribution.dislikes.includes(username),
        },
      };
    });
  }
}
