import clsx from 'clsx';
import { AiFillEye } from 'react-icons/ai';
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
} from 'react-icons/bs';
import { ImForward } from 'react-icons/im';
import { Icon, IContribution } from '../common';

interface IProps extends IContribution {}

export const Entry = ({
  id,
  type,
  createdAt,
  createdBy,
  description,
}: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const formatDate = (value: string): string => {
    return new Date(value).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      minute: 'numeric',
      hour: 'numeric',
    });
  };

  const iconClassName = clsx({
    'inline-flex h-full w-20 items-center justify-center rounded-lg text-2xl text-neutral focus':
      true,
    'bg-info': type === 'info',
    'bg-warning': type === 'sighting',
    'bg-error': type === 'alert',
  });

  return (
    <div key={id} className="flex items-center space-x-3 rounded-lg bg-neutral">
      <div className={iconClassName}>
        <Icon type={type} />
      </div>
      <div className="flex w-full px-5 py-3">
        <div className="flex flex-grow flex-col">
          <div className="space-x-3">
            <span className="text-xl font-semibold">{createdBy}</span>
            <span className="text-sm">{formatDate(createdAt)}</span>
          </div>
          <span className="w-full max-w-lg text-ellipsis">{description}</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* Open in gmaps */}
          <button className="btn">
            <ImForward />
          </button>
          {/* Scroll up to map and open card */}
          <button className="btn">
            <AiFillEye />
          </button>
          <button className="btn">
            <BsFillHandThumbsUpFill />
          </button>
          <button className="btn">
            <BsFillHandThumbsDownFill />
          </button>
        </div>
      </div>
    </div>
  );
};
