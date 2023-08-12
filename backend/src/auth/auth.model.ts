import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase-admin/firestore';
import { BaseModel, IsNotEmptyString } from '../common';
import { IAccount, ICoordinate } from './auth.types';

export class Account extends BaseModel implements IAccount {
  @IsNotEmptyString()
  username: string;

  location: ICoordinate;

  constructor(
    id: string,
    username: string,
    location: ICoordinate,
    isDeleted: boolean,
    createdAt: Date | Timestamp,
  ) {
    super(id, createdAt, isDeleted);
    this.username = username;
    this.location = location;
  }
}

export const AccountConverter = {
  toFirestore(contribution: IAccount): DocumentData {
    return {
      id: contribution.id,
      username: contribution.username,
      location: contribution.location,
      isDeleted: contribution.isDeleted,
      createdAt: contribution.createdAt,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot<IAccount>): IAccount {
    const data = snapshot.data();

    return new Account(
      data.id,
      data.username,
      data.location,
      data.isDeleted,
      data.createdAt,
    );
  },
};
