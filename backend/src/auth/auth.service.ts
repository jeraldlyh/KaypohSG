import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import * as MyInfoConnector from 'myinfo-connector-nodejs';
import { v4 as uuidv4 } from 'uuid';
import { WEB_URL } from '../common';
import { getUrl, MYINFO_CONFIG, ONE_MAP_ENDPOINT } from './auth.constant';
import { Account } from './auth.model';
import { AuthRepository } from './auth.repository';
import { ICoordinate, IOneMapResponse } from './auth.types';

@Injectable()
export class AuthService {
  private myinfoConnector: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    this.myinfoConnector = new MyInfoConnector(MYINFO_CONFIG);
  }
  async singpassLogin(): Promise<string> {
    const authUrl = getUrl('AUTHORISE');

    return `${authUrl}?client_id=${MYINFO_CONFIG.CLIENT_ID}&attributes=${
      MYINFO_CONFIG.ATTRIBUTES
    }&purpose=demonstrating MyInfo APIs&state=${encodeURIComponent(
      12345,
    )}&redirect_uri=${WEB_URL}`;
  }

  async createAccount(username: string, address: string): Promise<string> {
    let account = await this.authRepository.getAccount(username);

    if (!account) {
      const location = await this._getCoordinatesFromLocation(address);
      account = new Account(uuidv4(), username, location, false, new Date());

      await this.authRepository.createAccount(account);
    }

    return await this._signToken(account);
  }

  async _getCoordinatesFromLocation(location: string): Promise<ICoordinate> {
    const response = await this.httpService.axiosRef.get<IOneMapResponse>(
      ONE_MAP_ENDPOINT,
      {
        params: {
          searchVal: location,
          returnGeom: 'Y',
          getAddrDetails: 'N',
        },
      },
    );

    const { LATITUDE, LONGITUDE } = response.data.results[0];

    return {
      lat: LATITUDE,
      lng: LONGITUDE,
    };
  }

  async _signToken(payload: Account): Promise<string> {
    return await this.jwtService.signAsync(instanceToPlain(payload));
  }
}
