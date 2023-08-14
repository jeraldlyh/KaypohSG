import { IAccount, IModalState, IProfile } from './types';

export const CLIENT_ROUTES = {
  LANDING: '/',
  HOME: '/dashboard',
  SIGN_IN: '/signIn',
};

export const SERVER_ROUTES = {
  AUTH: {
    SIGN_OUT: '/auth/signOut',
    SIGN_IN: '/auth/callback',
    VALIDATE: '/auth/validate',
  },
  CONTRIBUTION: {
    GET_ALL: '/contribution',
    CREATE: '/contribution',
    LIKE: '/contribution/like',
    DISLIKE: '/contribution/dislike',
  },
  ONE_MAP: {
    SEARCH: '/one-map/search',
  },
};

export const WHITELISTED_ROUTES = new Set([
  CLIENT_ROUTES.SIGN_IN,
  CLIENT_ROUTES.LANDING,
]);

export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

export const SINGAPORE_CENTER_COORDINATES = {
  lat: 1.3521,
  lng: 103.8198,
};

export const MODAL_ID = 'modal';

export const DEFAULT_PAYLOAD: IModalState = {
  type: 'info',
  description: '',
  location: {
    lat: '',
    lng: '',
    address: '',
  },
  options: [],
};

export const PROFILES: IProfile[] = [
  { username: 'Mary', address: 'senja' },
  { username: 'John', address: 'pasir ris' },
  { username: 'Tom', address: 'sentosa' },
  { username: 'Sam', address: 'bishan' },
];

export const DEFAULT_ACCOUNT: IAccount = {
  id: '',
  username: '',
  isDeleted: false,
  createdAt: '',
  location: { lat: '', lng: '' },
};
