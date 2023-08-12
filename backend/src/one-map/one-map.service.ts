import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ONE_MAP_ENDPOINT } from '../auth/auth.constant';
import {
  ICoordinates,
  IOneMapResponse,
  IOneMapResult,
} from '../auth/auth.types';

@Injectable()
export class OneMapService {
  constructor(private readonly httpService: HttpService) {}

  async searchAddress(
    location: string,
    extractCoordinates = false,
  ): Promise<ICoordinates | IOneMapResult> {
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

    if (!extractCoordinates) {
      return response.data.results[0];
    }

    const { LATITUDE, LONGITUDE } = response.data.results[0];

    return {
      lat: LATITUDE,
      lng: LONGITUDE,
    };
  }
}
