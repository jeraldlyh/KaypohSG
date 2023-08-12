import GoogleMapReact from 'google-map-react';
import { IContribution, SINGAPORE_CENTER_COORDINATES } from '../common';
import { Marker } from './Marker';

interface IProps {
  displayContributionId: string;
  contributions: IContribution[];
  setDisplayContributionId: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}

export const Map = ({
  displayContributionId,
  contributions,
  setDisplayContributionId,
  onClose,
}: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const renderMarkers = (): JSX.Element[] => {
    return contributions.map((contribution) => (
      <Marker
        key={contribution.id}
        isOpen={displayContributionId === contribution.id}
        lat={+contribution.location.lat}
        lng={+contribution.location.lng}
        type={contribution.type}
        createdBy={contribution.createdBy}
        createdAt={contribution.createdAt}
        description={contribution.description}
        onOpen={() => setDisplayContributionId(contribution.id)}
        onClose={onClose}
      />
    ));
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="mt-44 h-full w-full overflow-hidden rounded-xl">
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
        {renderMarkers()}
      </GoogleMapReact>
    </div>
  );
};
