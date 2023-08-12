import { IContribution } from './types';

export const CLIENT_ROUTES = {
  LANDING: '/',
  HOME: '/home',
  SIGN_IN: '/signIn',
};

export const SERVER_ROUTES = {
  AUTH: {
    SIGN_OUT: '/auth/signOut',
    SIGN_IN: '/auth/signIn',
    VALIDATE: '/auth/validate',
  },
};

export const WHITELISTED_ROUTES = new Set([
  CLIENT_ROUTES.SIGN_IN,
  CLIENT_ROUTES.HOME,
]);

export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const SINGAPORE_CENTER_COORDINATES = {
  lat: 1.3521,
  lng: 103.8198,
};

export const MODAL_ID = 'modal';

export const DEFAULT_CONTRIBUTION: IContribution = {
  type: 'alert',
  description: '',
};
