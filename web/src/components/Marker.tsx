import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import { AiFillCalendar } from 'react-icons/ai';
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsFillPersonFill,
} from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { Icon, TType } from '../common';

interface IProps {
  lat: number;
  lng: number;
  type: TType;
  description: string;
  isOpen: boolean;
  createdAt: string;
  createdBy: string;
  onOpen: () => void;
  onClose: () => void;
}

export const Marker = (props: IProps): JSX.Element => {
  const { type, description, isOpen, createdAt, createdBy, onOpen, onClose } =
    props;

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const formatDate = (value: string): string => {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  const renderMarker = (): JSX.Element => {
    if (!isOpen) {
      const iconClassName = clsx({
        'text-info': type === 'info',
        'text-warning': type === 'sighting',
        'text-error': type === 'alert',
      });

      return (
        <div
          className="btn btn-circle btn-ghost btn-sm text-xl"
          onClick={onOpen}
        >
          <FaMapMarkerAlt className={iconClassName} />
        </div>
      );
    }

    return (
      <motion.div
        className="card relative w-52 bg-base-100 shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={onClose}
        >
          <RxCross2 />
        </button>
        <div className="absolute left-1/2 top-0 inline-flex h-14 w-14  -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-base-100 text-lg">
          <Icon type={type} />
        </div>
        <div className="card-body">
          <h2 className="card-title self-center text-base">
            {type.toUpperCase()}
          </h2>
          <p className="h-full max-h-24 truncate whitespace-normal break-all text-sm">
            {description}
          </p>
          <div className="mt-2 flex flex-col space-y-2 text-xs italic">
            <div className="flex items-center space-x-2">
              <AiFillCalendar />
              <span>{formatDate(createdAt)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BsFillPersonFill className="text-base" />
              <span className="truncate">
                {createdBy}a;lskdl;akd;laskdl;as;lka;ldk;a;l
              </span>
            </div>
          </div>
          <div className="divider m-0" />
          <div className="card-actions justify-center">
            <button className="btn btn-secondary btn-sm">
              <BsFillHandThumbsUpFill />
            </button>
            <button className="btn btn-primary btn-sm">
              <BsFillHandThumbsDownFill />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return renderMarker();
};
