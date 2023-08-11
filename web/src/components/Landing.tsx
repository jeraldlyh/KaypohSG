'use client';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES, Container } from '../common';
import { LandingIcon } from './LandingIcon';

export const Landing = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                              HANDLER FUNCTIONS                             */
  /* -------------------------------------------------------------------------- */
  const handleGetStarted = (): void => {
    router.push(CLIENT_ROUTES.SIGN_UP);
  };

  const handleContinue = (): void => {
    router.push(CLIENT_ROUTES.SIGN_IN);
  };

  return (
    <Container styles="space-y-5 justify-center">
      <LandingIcon />
      <div className="flex flex-col items-center font-bold uppercase tracking-widest">
        <span className="text-xl lg:text-3xl">Building Bonds</span>
        <span className="text-2xl lg:text-5xl">Ensuring Security</span>
      </div>
      <div className="flex w-full flex-col items-center space-y-3">
        <button
          className="btn btn-primary w-full max-w-xs font-semibold lg:max-w-sm"
          onClick={handleGetStarted}
        >
          Get started
        </button>
        <button
          className="btn btn-secondary btn-outline w-full max-w-xs font-semibold lg:max-w-sm"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </Container>
  );
};
