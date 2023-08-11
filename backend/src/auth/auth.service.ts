import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as MyInfoConnector from 'myinfo-connector-nodejs';
import { WEB_URL } from '../common';
import { getUrl, MYINFO_CONFIG } from './auth.constant';

@Injectable()
export class AuthService {
  private myinfoConnector: any;

  constructor(private readonly httpService: HttpService) {
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
}
