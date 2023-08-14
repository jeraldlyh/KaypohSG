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
    'inline-flex h-full md:w-20 w-full items-center justify-center lg:rounded-lg rounded-t-lg text-4xl text-base-100 py-2 md:py-0 rounded-b-none md:rounded-l-lg md:rounded-r-none':
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
    <div
      key={id}
      className="flex flex-col items-center space-x-3 rounded-lg bg-base-100 text-base-content md:flex-row"
    >
      <div className={iconClassName}>
        <Icon type={type} />
      </div>
      <div className="flex w-full flex-col space-y-5 px-7 py-3 md:px-5 lg:flex-row lg:space-y-0">
        <div className="flex flex-grow flex-col">
          <div className="mb-4 flex items-end justify-between space-x-3 md:mb-0 md:flex-none md:items-baseline md:justify-normal">
            <span className="truncate text-lg font-bold md:text-xl">
              {createdBy}
            </span>
            <span className="truncate text-xs uppercase">{formatDate()}</span>
          </div>
          <span className="break-all text-sm md:mt-2 md:max-w-[350px] lg:mt-1 lg:max-w-[390px]">
            {description}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:flex-none sm:gap-0 md:justify-normal md:space-x-2">
          <a
            className="btn btn-md basis-[45%] sm:basis-0"
            href={formatGoogleUrl()}
            target="_blank"
          >
            <BsFillMapFill />
          </a>
          <button
            className="btn btn-md basis-[45%] sm:basis-0"
            onClick={handleOnView}
          >
            <AiFillEye />
          </button>
          <button
            className="btn btn-md relative basis-[45%] sm:basis-0"
            onClick={handleLike}
            disabled={isButtonDisabled()}
          >
            <BsFillHandThumbsUpFill />
            <span className="absolute right-0 top-0 z-20 inline-flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-success text-neutral">
              {likes.length}
            </span>
          </button>
          <button
            className="btn btn-md relative basis-[45%] sm:basis-0"
            onClick={handleDislike}
            disabled={isButtonDisabled()}
          >
            <BsFillHandThumbsDownFill />
            <span className="absolute right-0 top-0 z-20 inline-flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-error text-neutral">
              {dislikes.length}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
