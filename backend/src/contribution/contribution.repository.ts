import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { Contribution, ContributionConverter } from './contribution.model';

@Injectable()
export class ContributionRepository {
  private readonly contributionCollection: string = 'contribution';

  async getAllContributionByLocation(
    location: string,
  ): Promise<Contribution[]> {
    const result = await firebase
      .firestore()
      .collection(this.contributionCollection)
      .withConverter(ContributionConverter)
      .get();

    // NOTE: Expensive computation by fetching all
    return result.docs
      .map((doc) => doc.data())
      .filter((data) => data.location === location);
  }

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
