import { Test, TestingModule } from '@nestjs/testing';
import { AuthStub } from '../../auth/__tests__/auth.stub';
import { ContributionRepository } from '../contribution.repository';
import { ContributionService } from '../contribution.service';
import { IGetContribution } from '../contribution.types';
import { ContributionStub, GetContributionStub } from './contribution.stub';

const mockGetAll = jest.fn();
jest.mock('../contribution.repository', () => ({
  ContributionRepository: jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    getAllByLocation: jest.fn(),
    create: jest.fn(),
    like: jest.fn(),
    dislike: jest.fn(),
    updateLikes: jest.fn(),
  })),
}));

describe('ContributionService', () => {
  let contributionService: ContributionService;
  let contributionRepository: ContributionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContributionService, ContributionRepository],
    }).compile();

    contributionService = module.get<ContributionService>(ContributionService);
    contributionRepository = module.get<ContributionRepository>(
      ContributionRepository,
    );

    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
    mockGetAll.mockReset();
  });

  describe('contributionsService', () => {
    it('should have a defined service', () => {
      expect(contributionService).toBeDefined();
    });

    it('should have a defined repository', () => {
      expect(contributionRepository).toBeDefined();
    });
  });

  describe('when getAll is called', () => {
    let contributions: IGetContribution[];

    beforeEach(async () => {
      mockGetAll.mockResolvedValue([ContributionStub()]);
      contributions = await contributionService.getAll(AuthStub().username);
    });

    it('should call contributionRepository', () => {
      expect(contributionRepository.getAll).toBeCalled();
    });

    it('should return a list of contributions', () => {
      expect(contributions).toStrictEqual([GetContributionStub()]);
    });
  });

  describe('when getAllByLocation is called', () => {
    it('should call contributionRepository', async () => {
      mockGetAll.mockResolvedValue([ContributionStub()]);
      const { username, location } = AuthStub();

      await contributionService.getAllByLocation(username, location);

      expect(contributionRepository.getAll).toBeCalled();
    });

    it('should return a list of contributions', async () => {
      mockGetAll.mockResolvedValue([ContributionStub()]);
      const { username, location } = AuthStub();

      const contributions = await contributionService.getAllByLocation(
        username,
        location,
      );

      expect(contributions).toStrictEqual([GetContributionStub()]);
    });

    it('should add user actions if user liked the contribution previously', async () => {
      const { username, location } = AuthStub();
      const contribution = ContributionStub();
      contribution.likes.push(username);
      mockGetAll.mockResolvedValue([contribution]);

      const contributions = await contributionService.getAllByLocation(
        username,
        location,
      );

      const result = GetContributionStub();
      result.actions = { isLiked: true, isDisliked: false };
      result.likes.push(username);
      expect(contributions).toStrictEqual([result]);
    });
  });

  describe('when create is called', () => {
    it('should call contributionRepository', async () => {
      const { username, location } = AuthStub();
      const contribution = ContributionStub();

      await contributionService.create(username, location, contribution);

      expect(contributionRepository.create).toBeCalledWith(contribution);
    });

    it('should throw an error if it exceed acceptable radius', async () => {
      const { username, location } = AuthStub();
      const contribution = ContributionStub();
      contribution.location = {
        lat: '999',
        lng: '999',
      };

      await expect(
        contributionService.create(username, location, contribution),
      ).rejects.toThrow('You are only allowed to contribute to your vicinity');
    });
  });

  describe('when like is called', () => {
    it('should call contributionRepository', async () => {
      const id = 'test';
      const { username } = AuthStub();

      await contributionService.like(username, id);

      expect(contributionRepository.updateLikes).toBeCalledWith(username, id);
    });
  });

  describe('when dislike is called', () => {
    it('should call contributionRepository', async () => {
      const id = 'test';
      const { username } = AuthStub();

      await contributionService.dislike(username, id);

      expect(contributionRepository.updateLikes).toBeCalledWith(
        username,
        id,
        true,
      );
    });
  });

  describe('when _isWithinAcceptableRadius is called', () => {
    it.each`
      source                    | destination                       | isAcceptable
      ${{ lat: '0', lng: '0' }} | ${{ lat: '0', lng: '0' }}         | ${true}
      ${{ lat: '0', lng: '0' }} | ${{ lat: '0.006', lng: '0.005' }} | ${true}
      ${{ lat: '0', lng: '0' }} | ${{ lat: '1', lng: '1' }}         | ${false}
    `(
      'should return $isAcceptable if source is $source and destination is $destination',
      ({ source, destination, isAcceptable }) => {
        expect(
          contributionService._isWithinAcceptableRadius(source, destination),
        ).toBe(isAcceptable);
      },
    );
  });

  describe('when _appendUserActions is called', () => {
    const contribution = ContributionStub();
    contribution.likes.push('apple');

    it.each`
      contributions     | username    | exists
      ${[contribution]} | ${'apple'}  | ${true}
      ${[contribution]} | ${'random'} | ${false}
    `(
      "should return $exists if user $username is part of contribution's like/dislike",
      ({ contributions, username, exists }) => {
        const result = contributionService._appendUserActions(
          contributions,
          username,
        );

        expect(result).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              actions: { isLiked: exists, isDisliked: false },
            }),
          ]),
        );
      },
    );
  });
});
