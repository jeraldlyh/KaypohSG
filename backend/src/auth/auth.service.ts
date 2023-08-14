import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
// import * as MyInfoConnector from 'myinfo-connector-nodejs';
import { v4 as uuidv4 } from 'uuid';
import { OneMapService } from '../one-map/one-map.service';
import { Account } from './auth.model';
import { AuthRepository } from './auth.repository';
import { IJwtTokenPayload, IJwtVerifiedToken } from './auth.types';

@Injectable()
export class AuthService {
  //   private myinfoConnector: any;

  constructor(
    private readonly oneMapService: OneMapService,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    // this.myinfoConnector = new MyInfoConnector(MYINFO_CONFIG);
  }
  //   async singpassLogin(): Promise<string> {
  //     const authUrl = getUrl('AUTHORISE');

  //     return `${authUrl}?client_id=${MYINFO_CONFIG.CLIENT_ID}&attributes=${
  //       MYINFO_CONFIG.ATTRIBUTES
  //     }&purpose=demonstrating MyInfo APIs&state=${encodeURIComponent(
  //       uuidv4(),
  //     )}&redirect_uri=${WEB_URL}`;
  //   }

  async createAccount(
    username: string,
    address: string,
  ): Promise<IJwtTokenPayload> {
    let account = await this.authRepository.getAccount(username);

    if (!account) {
      const locations = await this.oneMapService.searchAddress(address);
      account = new Account(
        uuidv4(),
        username,
        locations[0],
        false,
        new Date(),
      );

      await this.authRepository.createAccount(account);
    }

    return {
      account,
      token: await this._signToken(account),
    };
  }

  async validateToken(token: string): Promise<IJwtVerifiedToken> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.AUTH_SECRET,
      });
    } catch (error) {
      return undefined;
    }
  }

  async _signToken(payload: Account): Promise<string> {
    return await this.jwtService.signAsync(instanceToPlain(payload));
  }
}
