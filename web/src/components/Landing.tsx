'use client';
import { Container, SingpassIcon } from '../common';
import { useAuth } from '../hooks';
import { LandingIcon } from './LandingIcon';

export const Landing = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const { signIn } = useAuth();

  return (
    <Container styles="space-y-5 justify-center">
      <LandingIcon />
      <div className="flex flex-col items-center space-y-1 text-2xl font-extrabold uppercase tracking-wide md:text-4xl">
        <div>
          <span>Building </span>
          <span className="text-error">Bonds</span>
        </div>
        <div>
          <span>Ensuring </span>
          <span className="text-error">Security</span>
        </div>
      </div>
      <button
        className="btn-netural btn btn-md flex w-full max-w-xs items-center font-extrabold tracking-wide md:btn-lg md:max-w-md"
        onClick={signIn}
      >
        <span>Login with</span>
        <SingpassIcon />
      </button>
    </Container>
  );
};
