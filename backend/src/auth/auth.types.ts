import { IBaseModel } from '../common/base.model';
import { Account } from './auth.model';

export interface IQuery {
  username: string;
  address: string;
}

export interface IAccount extends IBaseModel {
  username: string;
  location: ICoordinates;
}

export interface ICoordinates {
  lat: string;
  lng: string;
}

export interface IOneMapResponse {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: {
    SEARCHVAL: string;
    X: string;
    Y: string;
    LATITUDE: string;
    LONGITUDE: string;
  }[];
}

export interface IAuth extends Account {
  token: string;
}
