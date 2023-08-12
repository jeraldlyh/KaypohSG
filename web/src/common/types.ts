export interface IUser {
  username: string | null;
}

export type TType = 'info' | 'alert' | 'sighting';

export interface IContribution {
  type: TType;
  description: string;
}
