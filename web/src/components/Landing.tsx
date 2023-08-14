'use client';
import React, { useState } from 'react';
import { Container, IProfile, PROFILES, SingpassIcon } from '../common';
import { useAuth } from '../hooks';
import { LandingIcon } from './LandingIcon';

export const Landing = () => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const { signIn } = useAuth();
  const [profile, setProfile] = useState<IProfile>();

  /* -------------------------------------------------------------------------- */
  /*                              HANDLER FUNCTIONS                             */
  /* -------------------------------------------------------------------------- */
  const handleSignIn = async (): Promise<void> => {
    if (!profile) return;

    await signIn(profile.username, profile.address);
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    const username = e.target.value.split(' | ')[0];
    const selectedProfile = PROFILES.find(
      (profile) => profile.username === username,
    );

    setProfile(selectedProfile);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  const renderProfiles = (): JSX.Element[] => {
    return PROFILES.map((profile, index) => (
      <option key={index}>
        {profile.username} | {profile.address.toUpperCase()}
      </option>
    ));
  };

  return (
    <Container styles="space-y-5">
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
      <div className="flex flex-col">
        <span className="mb-2 text-center font-semibold uppercase">
          Mock Profile
        </span>
        <select
          className="select select-bordered"
          onChange={handleOptionChange}
        >
          {renderProfiles()}
        </select>
      </div>
      <button
        className="btn-netural btn btn-md flex w-full max-w-xs items-center font-extrabold tracking-wide md:btn-lg md:max-w-md"
        onClick={handleSignIn}
        disabled={!profile}
      >
        <span>Login with</span>
        <SingpassIcon />
      </button>
    </Container>
  );
};
