'use client';
import { useState } from 'react';
import { Container } from '../common';
import { Legend } from './Legend';
import { Map } from './Map';
import { NavBar } from './Navbar';
import { Tabs } from './Tabs';

export const Dashboard = (): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [displayContributionId, setDisplayContributionId] =
    useState<string>('');

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Container styles="space-y-4">
      <NavBar />
      <Map
        displayContributionId={displayContributionId}
        setDisplayContributionId={setDisplayContributionId}
        onClose={() => setDisplayContributionId('')}
      />
      <Legend />
      <Tabs setDisplayContributionId={setDisplayContributionId} />
    </Container>
  );
};
