import { Timestamp } from 'firebase-admin/firestore';

export interface IBaseModel {
  id: string;
  createdAt: Date | Timestamp;
  isDeleted: boolean;
}

export class BaseModel implements IBaseModel {
  public id: string;
  public createdAt: Date | Timestamp;
  public isDeleted: boolean;

  constructor(id: string, createdAt: Date | Timestamp, isDeleted: boolean) {
    this.id = id;
    this.createdAt = createdAt;
    this.isDeleted = isDeleted;
  }
}
