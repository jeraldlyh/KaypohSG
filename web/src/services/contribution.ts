import { IContribution, SERVER_ROUTES } from '../common';
import AxiosService from './axios';

const getAll = async (): Promise<IContribution[]> => {
  const result = await AxiosService.get<IContribution[]>(
    SERVER_ROUTES.CONTRIBUTION.GET_ALL,
  );

  return result.data;
};

export const ContributionService = {
  getAll,
};
