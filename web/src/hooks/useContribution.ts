import useSWR from 'swr';
import { SERVER_ROUTES } from '../common';
import { ContributionService } from '../services';

export const useContribution = () => {
  const { data, error, isLoading, mutate } = useSWR(
    SERVER_ROUTES.CONTRIBUTION.GET_ALL,
    ContributionService.getAll,
    // NOTE: Able to add refresh interval to poll for new updates
  );

  return { data, error, isLoading, mutate };
};
