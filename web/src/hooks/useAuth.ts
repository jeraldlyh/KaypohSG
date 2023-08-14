import { AxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { CLIENT_ROUTES, IAccount, Utils, WHITELISTED_ROUTES } from '../common';
import { AuthService } from '../services';

export const useAuth = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const DEFAULT_ACCOUNT: IAccount = {
    id: '',
    username: '',
    isDeleted: false,
    createdAt: '',
    location: { lat: '', lng: '' },
  };
  const [account, setAccount] = useState<IAccount>(DEFAULT_ACCOUNT);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    validateIsUserLoggedIn();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const validateIsUserLoggedIn = async (): Promise<void> => {
    try {
      const isPathAllowed = WHITELISTED_ROUTES.has(pathname);
      const account = await AuthService.validateUserAuth();
      setAccount(account);

      if (!account && !isPathAllowed) {
        resetUser();
        goToLanding();
      } else if (account && isPathAllowed) {
        goToHome();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message !== 'Missing token') {
          resetUser();
          goToLanding();
        }
      }
    }

    setIsLoading(false);
  };

  const resetUser = (): void => {
    setAccount(DEFAULT_ACCOUNT);
  };

  const goToLanding = (): void => {
    router.push(CLIENT_ROUTES.LANDING);
  };

  const goToHome = (): void => {
    router.push(CLIENT_ROUTES.HOME);
  };

  const signIn = async (username: string, address: string): Promise<void> => {
    let hasError = false;

    await toast.promise(AuthService.signIn(username, address), {
      loading: 'Attempting to login',
      success: (data) => {
        setAccount(data.account);

        return 'Logged in';
      },
      error: (e) => {
        hasError = true;

        return Utils.capitalize(e.response.data.message.toString());
      },
    });
    if (!hasError) goToHome();
  };

  const signOut = async (): Promise<void> => {
    await toast.promise(AuthService.signOut(), {
      loading: 'Attempting to logout',
      success: 'Logged out',
      error: (e) => Utils.capitalize(e.response.data.message.toString()),
    });
    goToLanding();
  };

  return { account, signIn, signOut, isLoading };
};
