import GoogleMapReact from 'google-map-react';
import { SINGAPORE_CENTER_COORDINATES } from '../common';
import { useAuth } from '../hooks';
import { useContribution } from '../hooks/useContribution';
import { Marker } from './Marker';
import { UserLocation } from './UserLocation';

interface IProps {
  displayContributionId: string;
  setDisplayContributionId: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

export const Map = ({
  displayContributionId,
  setDisplayContributionId,
  onClose,
}: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                   STATES                                   */
  /* -------------------------------------------------------------------------- */
  const { account } = useAuth();
  const { data: contributions } = useContribution();

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const renderMarkers = (): JSX.Element[] => {
    if (!contributions) return [];

    return contributions.map((contribution) => (
      <Marker
        {...contribution}
        key={contribution.id}
        isOpen={displayContributionId === contribution.id}
        lat={+contribution.location.lat}
        lng={+contribution.location.lng}
        onOpen={() => setDisplayContributionId(contribution.id)}
        onClose={onClose}
      />
    ));
  };

  const renderUserLocation = (): JSX.Element => {
    const {
      location: { lat, lng },
    } = account;

    return <UserLocation lat={lat} lng={lng} />;
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="h-screen w-full overflow-hidden rounded-xl">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_API_KEY || '' }}
        defaultZoom={12}
        defaultCenter={SINGAPORE_CENTER_COORDINATES}
        options={{
          disableDoubleClickZoom: true,
          clickableIcons: false,
          zoomControl: false,
          fullscreenControl: false,
          panControl: false,
          scrollwheel: false,
        }}
      >
        {renderUserLocation()}
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
};
