'use client';
import { useEffect, useState } from 'react';
import { Container, IContribution } from '../common';
import { ContributionService } from '../services/contribution';
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

  const handleLogout = (): Promise<void> => {};

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Container>
      <div className="w-full">
        <NavBar onLogout={handleLogout} />
        <Map
          displayContributionId={displayContributionId}
          contributions={contributions}
          setDisplayContributionId={setDisplayContributionId}
          onClose={() => setDisplayContributionId('')}
        />
        <Tabs contributions={contributions} />
      </div>
    </Container>
  );
};
