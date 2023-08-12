import { IBaseModel } from '../common/base.model';

export type TType = 'info' | 'sighting' | 'alert';

export interface IContribution extends IBaseModel {
  type: TType;
  description: string;
  createdBy: string;
  location: string;
}
