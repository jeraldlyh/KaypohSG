import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { Contribution, ContributionConverter } from './contribution.model';

@Injectable()
export class ContributionRepository {
  private readonly contributionCollection: string = 'contribution';

  async createContribution(contribution: Contribution): Promise<void> {
    const id = uuidv4();
    contribution.id = id;

    await firebase
      .firestore()
      .collection(this.contributionCollection)
      .doc(id)
      .withConverter(ContributionConverter)
      .set(contribution);
  }
}
