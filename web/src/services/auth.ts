import { SERVER_ROUTES } from '../common';
import AxiosService from './axios';

const signIn = async (): Promise<string> => {
  const result = await AxiosService.get<string>(SERVER_ROUTES.AUTH.SIGN_IN, {
    params: { username: 'test', address: 'senja' },
  });

  return result.data;
};

const signOut = async (): Promise<void> => {
  await AxiosService.post<void>(SERVER_ROUTES.AUTH.SIGN_OUT);
};

const validateUserAuth = async (): Promise<boolean> => {
  const result = await AxiosService.post<boolean>(SERVER_ROUTES.AUTH.VALIDATE);

  return result.data;
};

export const AuthService = {
  signIn,
  signOut,
  validateUserAuth,
};
