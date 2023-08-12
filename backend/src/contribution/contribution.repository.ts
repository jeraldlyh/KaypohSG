import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { Contribution, ContributionConverter } from './contribution.model';

@Injectable()
export class ContributionRepository {
  private readonly contributionCollection: string = 'contribution';
  private readonly LIMIT = 50;

  async getAll(): Promise<Contribution[]> {
    const result = await firebase
      .firestore()
      .collection(this.contributionCollection)
      .withConverter(ContributionConverter)
      .orderBy('createdAt', 'desc')
      .limit(this.LIMIT)
      .get();

    return result.docs.map((doc) => doc.data());
  }

  async create(contribution: Contribution): Promise<void> {
    const id = uuidv4();
    contribution.id = id;
    contribution.isDeleted = false;
    contribution.createdAt = new Date();
    contribution.likes = [];
    contribution.dislikes = [];

    await firebase
      .firestore()
      .collection(this.contributionCollection)
      .doc(id)
      .withConverter(ContributionConverter)
      .set(contribution);
  }

  async updateLikes(
    username: string,
    id: string,
    isDislike = false,
  ): Promise<void> {
    await firebase
      .firestore()
      .collection(this.contributionCollection)
      .doc(id)
      .update(
        isDislike
          ? {
              dislikes: firebase.firestore.FieldValue.arrayUnion(username),
            }
          : {
              likes: firebase.firestore.FieldValue.arrayUnion(username),
            },
      );
  }
}
