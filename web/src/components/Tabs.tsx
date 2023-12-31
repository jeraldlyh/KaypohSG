import { clsx } from 'clsx';
import React, { useState } from 'react';
import { IContribution, TType } from '../common';
import { useContribution } from '../hooks/useContribution';
import { Section } from './Section';

interface IProps {
  setDisplayContributionId: React.Dispatch<React.SetStateAction<string>>;
}

export const Tabs = ({ setDisplayContributionId }: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [currentTab, setCurrentTab] = useState<TType>('info');
  const { data: contributions } = useContribution();

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const getTabClassName = (type: TType): string => {
    return clsx({
      'tab w-full flex-nowrap self-center py-6 text-lg': true,
      'tab-active': currentTab === type,
    });
  };

  const filterContributions = (): IContribution[] => {
    if (!contributions) return [];

    return contributions.filter(
      (contribution) => contribution.type === currentTab,
    );
  };

  const handleTabChange = (type: TType): void => {
    setCurrentTab(type);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="w-full">
      <div className="tabs-boxed tabs flex-nowrap justify-around font-semibold uppercase">
        <a
          className={getTabClassName('info')}
          onClick={() => handleTabChange('info')}
        >
          Info
        </a>
        <a
          className={getTabClassName('sighting')}
          onClick={() => handleTabChange('sighting')}
        >
          Sighting
        </a>
        <a
          className={getTabClassName('alert')}
          onClick={() => handleTabChange('alert')}
        >
          Alert
        </a>
      </div>
      <Section
        data={filterContributions()}
        setDisplayContributionId={setDisplayContributionId}
      />
    </div>
  );
};
