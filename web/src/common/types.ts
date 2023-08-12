export interface IUser {
  username: string | null;
}

export type TType = 'info' | 'alert' | 'sighting';

export interface ICoordinates {
  lat: string;
  lng: string;
  address: string;
}

export interface IContribution {
  id: string;
  type: TType;
  description: string;
  createdBy: string;
  location: ICoordinates;
  createdAt: string;
}

export interface ICreateContributionDto {
  type: TType;
  description: string;
  location: ICoordinates;
}

export interface IModalState {
  location: ICoordinates;
  type: TType;
  description: string;
  options: ICoordinates[];
}
