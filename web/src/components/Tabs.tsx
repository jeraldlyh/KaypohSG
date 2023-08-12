import { clsx } from 'clsx';
import { useState } from 'react';
import { IContribution, TType } from '../common';
import { Section } from './Section';

interface IProps {
  contributions: IContribution[];
}

export const Tabs = ({ contributions }: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [currentTab, setCurrentTab] = useState<TType>('info');

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
  );
};
