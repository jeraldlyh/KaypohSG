import { IsIn } from 'class-validator';
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase-admin/firestore';
import { BaseModel, IsNotEmptyString } from '../common';
import { IContribution, TType } from './contribution.types';

export class Contribution extends BaseModel implements IContribution {
  @IsNotEmptyString()
  @IsIn(['info', 'sighting', 'alert'])
  public type: TType;

  @IsNotEmptyString()
  public description: string;

  public location: string;
  public createdBy: string;

  constructor(
    id: string,
    type: TType,
    description: string,
    createdBy: string,
    location: string,
    isDeleted: boolean,
    createdAt: Date | Timestamp,
  ) {
    super(id, createdAt, isDeleted);
    this.type = type;
    this.description = description;
    this.createdBy = createdBy;
    this.location = location;
  }
}

export const ContributionConverter = {
  toFirestore(contribution: IContribution): DocumentData {
    return {
      id: contribution.id,
      type: contribution.type,
      description: contribution.description,
      createdBy: contribution.createdBy,
      location: contribution.location,
      isDeleted: contribution.isDeleted,
      createdAt: contribution.createdAt,
    };
  },

  fromFirestore(snapshot: QueryDocumentSnapshot<IContribution>): IContribution {
    const data = snapshot.data();

    return new Contribution(
      data.id,
      data.type,
      data.description,
      data.createdBy,
      data.location,
      data.isDeleted,
      data.createdAt,
    );
  },
};
