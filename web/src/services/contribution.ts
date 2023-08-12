import {
  IContribution,
  ICreateContributionDto,
  SERVER_ROUTES,
} from '../common';
import AxiosService from './axios';

const getAll = async (): Promise<IContribution[]> => {
  const result = await AxiosService.get<IContribution[]>(
    SERVER_ROUTES.CONTRIBUTION.GET_ALL,
  );

  return result.data;
};

const create = async (contribution: ICreateContributionDto): Promise<void> => {
  return await AxiosService.post(
    SERVER_ROUTES.CONTRIBUTION.CREATE,
    contribution,
  );
};

export const ContributionService = {
  getAll,
  create,
};
