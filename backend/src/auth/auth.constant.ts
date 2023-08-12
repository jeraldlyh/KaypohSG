import { ENVIRONMENT } from '../common';

const MYINFO_ENDPOINTS = {
  AUTHORISE: {
    SANDBOX: 'https://sandbox.api.myinfo.gov.sg/com/v3/authorise',
    TEST: 'https://test.api.myinfo.gov.sg/com/v3/authorise',
  },
  TOKEN: {
    SANDBOX: 'https://sandbox.api.myinfo.gov.sg/com/v3/token',
    TEST: 'https://test.api.myinfo.gov.sg/com/v3/token',
  },
  PERSON: {
    SANDBOX: 'https://sandbox.api.myinfo.gov.sg/com/v3/person',
    TEST: 'https://test.api.myinfo.gov.sg/com/v3/person',
  },
};

export const MYINFO_CONFIG = {
  MYINFO_SIGNATURE_CERT_PUBLIC_CERT: './cert/myinfo-public-cert.pem',
  CLIENT_ID: process.env.MYINFO_CLIENT_ID,
  CLIENT_SECRET: process.env.MYINFO_CLIENT_SECRET,
  CLIENT_SECURE_CERT: './cert/kaypoh-sg-certificate.p12',
  CLIENT_SECURE_CERT_PASSPHRASE:
    process.env.MYINFO_CLIENT_SECURE_CERT_PASSPHRASE,
  REDIRECT_URL: process.env.MYINFO_CALLBACK_URL,
  ATTRIBUTES: process.env.MYINFO_SCOPES,
  ENVIRONMENT: 'TEST',
  TOKEN_URL: MYINFO_ENDPOINTS['TOKEN'][ENVIRONMENT],
  PERSON_URL: MYINFO_ENDPOINTS['PERSON'][ENVIRONMENT],
  USE_PROXY: 'N',
  PROXY_TOKEN_URL: '',
  PROXY_PERSON_URL: '',
  ...(process.env.NODE_ENV === 'development' && { DEBUG_LEVEL: 'info' }),
};

export const getUrl = (url: 'AUTHORISE' | 'TOKEN' | 'PERSON'): string => {
  return MYINFO_ENDPOINTS[url][ENVIRONMENT];
};

export const ONE_MAP_ENDPOINT = 'https://developers.onemap.sg/commonapi/search';
