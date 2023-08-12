import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthGuardMock, AuthStub } from '../../auth/__tests__/auth.stub';
import { ContributionController } from '../contribution.controller';
import { ContributionService } from '../contribution.service';
import { IGetContribution } from '../contribution.types';
import { ContributionStub, GetContributionStub } from './contribution.stub';

jest.mock('../contribution.service', () => ({
  ContributionService: jest.fn().mockImplementation(() => ({
    getAll: jest.fn().mockResolvedValue(GetContributionStub()),
    getAllByLocation: jest.fn().mockResolvedValue(GetContributionStub()),
    create: jest.fn(),
    like: jest.fn(),
    dislike: jest.fn(),
  })),
}));

describe('ContributionController', () => {
  let contributionController: ContributionController;
  let contributionService: ContributionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributionController],
      providers: [ContributionService],
    })
      .overrideGuard(AuthGuard)
      .useValue(AuthGuardMock)
      .compile();

    contributionController = module.get<ContributionController>(
      ContributionController,
    );
    contributionService = module.get<ContributionService>(ContributionService);

    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'));
  });

  describe('contributionController', () => {
    it('should have a defined controller', () => {
      expect(contributionController).toBeDefined();
    });

    it('should have a defined service', () => {
      expect(contributionService).toBeDefined();
    });
  });

  describe('when getAllContribution is called', () => {
    let contributions: IGetContribution[];

    beforeEach(async () => {
      contributions = await contributionController.getAllContribution(
        AuthStub(),
      );
    });

    it('should call contributionService', () => {
      expect(contributionService.getAll).toBeCalledWith(AuthStub().username);
    });

    it('should return a list of contributions', () => {
      expect(contributions).toStrictEqual(GetContributionStub());
    });
  });

  describe('when getAllByLocation is called', () => {
    let contributions: IGetContribution[];

    beforeEach(async () => {
      contributions = await contributionController.getAllByLocation(AuthStub());
    });

    it('should call contributionService', () => {
      const { username, location } = AuthStub();

      expect(contributionService.getAllByLocation).toBeCalledWith(
        username,
        location,
      );
    });

    it('should return a list of contributions', () => {
      expect(contributions).toStrictEqual(GetContributionStub());
    });
  });

  describe('when create is called', () => {
    it('should call contributionService', async () => {
      const contribution = ContributionStub();
      await contributionController.create(AuthStub(), contribution);

      const { username, location } = AuthStub();
      expect(contributionService.create).toBeCalledWith(
        username,
        location,
        contribution,
      );
    });
  });

  describe('when like is called', () => {
    it('should call contributionService', async () => {
      const id = 'test';
      await contributionController.like(AuthStub(), id);

      expect(contributionService.like).toBeCalledWith(AuthStub().username, id);
    });
  });

  describe('when dislike is called', () => {
    it('should call contributionService', async () => {
      const id = 'test';
      await contributionController.dislike(AuthStub(), id);

      expect(contributionService.dislike).toBeCalledWith(
        AuthStub().username,
        id,
      );
    });
  });
});
