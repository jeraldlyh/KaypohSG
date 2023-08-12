import { Injectable } from '@nestjs/common';
import firebase from 'firebase-admin';
import { Account, AccountConverter } from './auth.model';

@Injectable()
export class AuthRepository {
  private readonly accountCollection: string = 'account';

  async getAccount(username: string): Promise<Account> {
    const result = await firebase
      .firestore()
      .collection(this.accountCollection)
      .withConverter(AccountConverter)
      .doc(username)
      .get();

    return result.data();
  }

  async createAccount(account: Account): Promise<void> {
    await firebase
      .firestore()
      .collection(this.accountCollection)
      .doc(account.username)
      .withConverter(AccountConverter)
      .set(account);
  }
}
