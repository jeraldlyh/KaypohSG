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

const like = async (id: string): Promise<void> => {
  return await AxiosService.get(`${SERVER_ROUTES.CONTRIBUTION.LIKE}/${id}`);
};

const dislike = async (id: string): Promise<void> => {
  return await AxiosService.get(`${SERVER_ROUTES.CONTRIBUTION.DISLIKE}/${id}`);
};

export const ContributionService = {
  getAll,
  create,
  like,
  dislike,
};
