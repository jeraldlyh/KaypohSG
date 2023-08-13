import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ICoordinates, IOneMapResponse } from '../auth/auth.types';
import { ONE_MAP_ENDPOINT } from './one-map.constant';

@Injectable()
export class OneMapService {
  constructor(private readonly httpService: HttpService) {}

  async searchAddress(location: string): Promise<ICoordinates[]> {
    const response = await this.httpService.axiosRef.get<IOneMapResponse>(
      ONE_MAP_ENDPOINT,
      {
        params: {
          searchVal: location,
          returnGeom: 'Y',
          getAddrDetails: 'Y',
        },
      },
    );

    return response.data.results.slice(1, 3).map((result) => ({
      lat: result.LATITUDE,
      lng: result.LONGITUDE,
      address: result.ADDRESS,
    }));
  }
}
