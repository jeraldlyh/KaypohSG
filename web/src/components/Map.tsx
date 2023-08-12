import GoogleMapReact from 'google-map-react';
import { useState } from 'react';
import { SINGAPORE_CENTER_COORDINATES } from '../common';
import { Marker } from './Marker';

export const Map = (): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const [display, setDisplay] = useState<string>('1');

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
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
  );
};
