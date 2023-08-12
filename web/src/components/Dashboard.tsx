'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Container, IContribution, TType } from '../common';
import { ContributionService } from '../services/contribution';
import { NavBar } from './Navbar';
import { Section } from './Section';

export const Dashboard = (): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [currentTab, setCurrentTab] = useState<TType>('info');
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

  const getTabClassName = (type: TType): string => {
    return clsx({
      'tab w-full flex-nowrap self-center py-6 text-lg': true,
      'tab-active': currentTab === type,
    });
  };

  const handleTabChange = (type: TType): void => {
    setCurrentTab(type);
  };

  const filterContributions = (): IContribution[] => {
    return contributions.filter(
      (contribution) => contribution.type === currentTab,
    );
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Container>
      <div className="w-full">
        <NavBar onLogout={handleLogout} />
        {/* <Map /> */}
        <div className="mt-10 h-screen">
          <div className="tabs-boxed tabs flex-nowrap justify-around font-semibold uppercase">
            <a
              className={getTabClassName('info')}
              onClick={() => handleTabChange('info')}
            >
              Info
            </a>
            <a
              className={getTabClassName('alert')}
              onClick={() => handleTabChange('alert')}
            >
              Alert
            </a>
            <a
              className={getTabClassName('sighting')}
              onClick={() => handleTabChange('sighting')}
            >
              Sighting
            </a>
          </div>
          <Section data={filterContributions()} type={currentTab} />
        </div>
      </div>
    </Container>
  );
};
