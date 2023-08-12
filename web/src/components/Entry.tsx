import clsx from 'clsx';
import toast from 'react-hot-toast';
import { AiFillEye } from 'react-icons/ai';
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsFillMapFill,
} from 'react-icons/bs';
import { Icon, IContribution, Utils } from '../common';
import { ContributionService } from '../services';

interface IProps extends IContribution {
  onView: () => void;
  refetchData: () => Promise<void>;
}

export const Entry = ({
  id,
  type,
  createdAt,
  createdBy,
  description,
  location,
  likes,
  dislikes,
  actions: { isLiked, isDisliked },
  onView,
  refetchData,
}: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const formatDate = (): string => {
    return new Date(createdAt).toLocaleDateString('en-US', {
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

  const formatGoogleUrl = () => {
    return `http://maps.google.com/maps?z=12&t=m&q=loc:${location.lat}+${location.lng}`;
  };

  const handleOnView = (): void => {
    onView && onView();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLike = async (): Promise<void> => {
    await toast.promise(ContributionService.like(id), {
      loading: 'Attempting to like the contribution',
      success: `Successfully liked the contribution`,
      error: (e) => Utils.capitalize(e.response.data.message.toString()),
    });
    await refetchData();
  };

  const handleDislike = async (): Promise<void> => {
    await toast.promise(ContributionService.dislike(id), {
      loading: 'Attempting to dislike the contribution',
      success: `Successfully disliked the contribution`,
      error: (e) => Utils.capitalize(e.response.data.message.toString()),
    });
    await refetchData();
  };

  // NOTE: Prevent user from liking and disliking the contribution at the same time
  const isButtonDisabled = (): boolean => isLiked || isDisliked;

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div key={id} className="flex items-center space-x-3 rounded-lg bg-neutral">
      <div className={iconClassName}>
        <Icon type={type} />
      </div>
      <div className="flex w-full px-5 py-3">
        <div className="flex flex-grow flex-col">
          <div className="space-x-3">
            <span className="text-xl font-semibold">{createdBy}</span>
            <span className="text-sm">{formatDate()}</span>
          </div>
          <span className="w-full max-w-lg text-ellipsis">{description}</span>
        </div>
        <div className="flex items-center space-x-2">
          <a className="btn" href={formatGoogleUrl()} target="_blank">
            <BsFillMapFill />
          </a>
          {/* Scroll up to map and open card */}
          <button className="btn" onClick={handleOnView}>
            <AiFillEye />
          </button>
          <button
            className="btn"
            onClick={handleLike}
            disabled={isButtonDisabled()}
          >
            <BsFillHandThumbsUpFill />
          </button>
          <button
            className="btn"
            onClick={handleDislike}
            disabled={isButtonDisabled()}
          >
            <BsFillHandThumbsDownFill />
          </button>
        </div>
      </div>
    </div>
  );
};
