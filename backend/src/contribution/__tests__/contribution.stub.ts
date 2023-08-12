import { Contribution } from '../contribution.model';
import { IGetContribution } from '../contribution.types';

export const ContributionStub = (): Contribution => ({
  id: '0',
  type: 'alert',
  description: 'test',
  location: {
    lat: '123',
    lng: '456',
  },
  createdBy: 'apple',
  createdAt: new Date(),
  likes: [],
  dislikes: [],
  isDeleted: false,
});

export const GetContributionStub = (): IGetContribution => ({
  ...ContributionStub(),
  actions: {
    isLiked: false,
    isDisliked: false,
  },
});
