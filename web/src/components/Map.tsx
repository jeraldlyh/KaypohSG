import GoogleMapReact from 'google-map-react';
import { IContribution, SINGAPORE_CENTER_COORDINATES } from '../common';
import { Marker } from './Marker';

interface IProps {
  displayContributionId: string;
  contributions: IContribution[];
  setDisplayContributionId: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
  refetchData: () => Promise<void>;
}

export const Map = ({
  displayContributionId,
  contributions,
  refetchData,
  setDisplayContributionId,
  onClose,
}: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const renderMarkers = (): JSX.Element[] => {
    return contributions.map((contribution) => (
      <Marker
        {...contribution}
        key={contribution.id}
        isOpen={displayContributionId === contribution.id}
        lat={+contribution.location.lat}
        lng={+contribution.location.lng}
        refetchData={refetchData}
        onOpen={() => setDisplayContributionId(contribution.id)}
        onClose={onClose}
      />
    ));
  };

  const renderUserLocation = (): JSX.Element => {};

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="mt-44 h-2/3 w-full overflow-hidden rounded-xl">
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
