'use client';
import { createContext, useContext } from 'react';
import { DEFAULT_ACCOUNT, IAccount } from '../common';
import { useAuth } from '../hooks';

interface IAuthContext {
  account: IAccount;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  isLoading: boolean;
}

interface IAuthProvider {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  account: DEFAULT_ACCOUNT,
  signIn: () => {},
  signOut: () => {},
  isLoading: true,
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: IAuthProvider) => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const auth = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthProvider, useAuthContext };
