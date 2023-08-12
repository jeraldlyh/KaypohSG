'use client';
import clsx from 'clsx';
import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { Container, SINGAPORE_CENTER_COORDINATES, TType } from '../common';
import { Marker } from './Marker';
import { NavBar } from './Navbar';

export const Dashboard = (): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [display, setDisplay] = useState<string>('1');
  const [currentTab, setCurrentTab] = useState<TType>('info');

  /* -------------------------------------------------------------------------- */
  /*                              HANDLER FUNCTIONS                             */
  /* -------------------------------------------------------------------------- */
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

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Container>
      <div className="w-full">
        <NavBar onLogout={handleLogout} />
        <div className="mt-5 h-3/4 w-full overflow-hidden rounded-xl">
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY || '' }}
            defaultZoom={12}
            defaultCenter={SINGAPORE_CENTER_COORDINATES}
            options={{
              disableDoubleClickZoom: true,
              clickableIcons: false,
              maxZoom: 15,
              minZoom: 12,
            }}
          >
            <Marker
              isOpen={display === '1'}
              lat={1.3521}
              lng={103.8198}
              type="alert"
              description="testing"
              onOpen={() => setDisplay('1')}
              onClose={() => setDisplay('')}
            />
          </GoogleMapReact>
        </div>
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
        </div>
      </div>
    </Container>
  );
};
