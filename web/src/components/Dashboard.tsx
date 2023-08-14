'use client';
import { useEffect, useState } from 'react';
import { Container, IContribution } from '../common';
import { ContributionService } from '../services';
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
  const [contributions, setContributions] = useState<IContribution[]>([]);

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    fetchContributions();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              HANDLER FUNCTIONS                             */
  /* -------------------------------------------------------------------------- */
  const fetchContributions = async () => {
    const data = await ContributionService.getAll();
    setContributions(data);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Container styles="space-y-4">
      <NavBar />
      <Map
        displayContributionId={displayContributionId}
        contributions={contributions}
        setDisplayContributionId={setDisplayContributionId}
        onClose={() => setDisplayContributionId('')}
        refetchData={fetchContributions}
      />
      <Legend />
      <Tabs
        contributions={contributions}
        setDisplayContributionId={setDisplayContributionId}
        refetchData={fetchContributions}
      />
    </Container>
  );
};
