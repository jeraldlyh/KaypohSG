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

export interface IOneMapResult {
  SEARCHVAL: string;
  ROAD_NAME: string;
  BLK_NO: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface IOneMapResponse {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: IOneMapResult[];
}

export interface IAuth extends Account {
  token: string;
}
