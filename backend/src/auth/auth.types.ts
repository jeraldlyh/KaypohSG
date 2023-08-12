import { IBaseModel } from '../common/base.model';

export interface IQuery {
  username: string;
  address: string;
}

export interface IAccount extends IBaseModel {
  username: string;
  location: ICoordinate;
}

export interface ICoordinate {
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
