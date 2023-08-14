export interface IAccount {
  id: string;
  createdAt: string;
  username: string;
  isDeleted: boolean;
  location: {
    lat: string;
    lng: string;
  };
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
  likes: string[];
  dislikes: string[];
  actions: {
    isLiked: boolean;
    isDisliked: boolean;
  };
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

export interface ILoginResponse {
  account: IAccount;
  token: string;
}

export interface IProfile {
  username: string;
  address: string;
}
