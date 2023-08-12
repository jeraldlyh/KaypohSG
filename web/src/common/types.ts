export interface IUser {
  username: string | null;
}

export type TType = 'info' | 'alert' | 'sighting';

export interface ICoordinates {
  lat: string;
  lng: string;
}

export interface IContribution {
  id?: string;
  type: TType;
  description: string;
  createdBy?: string;
  location?: ICoordinates;
  createdAt: string;
}
