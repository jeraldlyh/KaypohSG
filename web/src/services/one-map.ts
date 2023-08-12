import { ICoordinates, SERVER_ROUTES } from '../common';
import AxiosService from './axios';

const searchAddress = async (address: string): Promise<ICoordinates[]> => {
  const result = await AxiosService.get<ICoordinates[]>(
    `${SERVER_ROUTES.ONE_MAP.SEARCH}/${address}`,
  );

  return result.data;
};

export const OneMapService = {
  searchAddress,
};
