import { FaMapMarkerAlt } from 'react-icons/fa';

export const Legend = (): JSX.Element => {
  return (
    <div className="mb-10 mt-5">
      <div className="flex flex-wrap justify-around gap-2 font-semibold uppercase md:flex-row md:justify-normal md:gap-0 md:space-x-5">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-info" />
          <span>Info</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-warning" />
          <span>Sighting</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-error" />
          <span>Alert</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="h-5 w-5 rounded-full border-2 border-dashed border-error p-2" />
          <span>Your vicinity</span>
        </div>
      </div>

      <div className="divider mb-0" />
    </div>
  );
};
