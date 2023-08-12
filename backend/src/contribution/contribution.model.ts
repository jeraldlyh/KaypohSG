import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import {
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from 'firebase-admin/firestore';
import { ICoordinates } from '../auth/auth.types';
import { BaseModel, IsNotEmptyString } from '../common';
import { IContribution, TType } from './contribution.types';

class Coordinates implements ICoordinates {
  @IsNotEmptyString()
  public lat: string;

  @IsNotEmptyString()
  public lng: string;
}

export class Contribution extends BaseModel implements IContribution {
  @IsNotEmptyString()
  @IsIn(['info', 'sighting', 'alert'])
  public type: TType;

  @IsNotEmptyString()
  public description: string;

  @ValidateNested()
  @IsObject()
  @IsNotEmptyObject()
  @Type(() => Coordinates)
  public location: Coordinates;

  public createdBy: string;

  constructor(
    id: string,
    type: TType,
    description: string,
    createdBy: string,
    location: ICoordinates,
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
      location: {
        lat: contribution.location.lat,
        lng: contribution.location.lng,
      },
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
      {
        lat: data.location.lat,
        lng: data.location.lng,
      },
      data.isDeleted,
      data.createdAt,
    );
  },
};
