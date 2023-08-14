import { IAccount, ILoginResponse, SERVER_ROUTES } from '../common';
import AxiosService from './axios';

const signIn = async (
  username: string,
  address: string,
): Promise<ILoginResponse> => {
  const result = await AxiosService.get<ILoginResponse>(
    SERVER_ROUTES.AUTH.SIGN_IN,
    {
      params: { username, address },
    },
  );

  return result.data;
};

const signOut = async (): Promise<void> => {
  await AxiosService.post<void>(SERVER_ROUTES.AUTH.SIGN_OUT);
};

const validateUserAuth = async (): Promise<IAccount> => {
  const result = await AxiosService.post<IAccount>(SERVER_ROUTES.AUTH.VALIDATE);

  return result.data;
};

export const AuthService = {
  signIn,
  signOut,
  validateUserAuth,
};
