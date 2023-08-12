'use client';
import { useRouter } from 'next/navigation';
import { CLIENT_ROUTES, Container, SingpassIcon } from '../common';
import { LandingIcon } from './LandingIcon';

export const Landing = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                              HANDLER FUNCTIONS                             */
  /* -------------------------------------------------------------------------- */
  const handleLogin = (): void => {
    router.push(CLIENT_ROUTES.SIGN_IN);
  };

  return (
    <Container styles="space-y-5 justify-center">
      <LandingIcon />
      <div className="flex flex-col items-center font-bold uppercase tracking-widest">
        <span className="text-xl md:text-3xl">Building Bonds</span>
        <span className="text-2xl md:text-5xl">Ensuring Security</span>
      </div>
      <button
        className="btn-netural btn flex w-full max-w-xs items-center md:btn-lg lg:max-w-sm"
        onClick={handleLogin}
      >
        <span className="tracking-wide">Log in with</span>
        <SingpassIcon />
      </button>
    </Container>
  );
};
