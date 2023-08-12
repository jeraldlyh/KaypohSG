export const WEB_URL = process.env.WEB_URL || 'http://localhost:3000';

export const ENVIRONMENT =
  process.env.NODE_ENV === 'production' ? 'TEST' : 'TEST';

export interface IRedirectUrl {
  url: string;
}

export * from './base.model';
export * from './decorator';
