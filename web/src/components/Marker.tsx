import { clsx } from 'clsx';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { AiFillCalendar } from 'react-icons/ai';
import {
  BsFillHandThumbsDownFill,
  BsFillHandThumbsUpFill,
  BsFillPersonFill,
} from 'react-icons/bs';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { Icon, IContribution, Utils } from '../common';
import { useContribution } from '../hooks/useContribution';
import { ContributionService } from '../services';

interface IProps extends IContribution {
  lat: number;
  lng: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const Marker = (props: IProps): JSX.Element => {
  const {
    id,
    type,
    description,
    isOpen,
    createdAt,
    createdBy,
    likes,
    dislikes,
    actions: { isLiked, isDisliked },
    onOpen,
    onClose,
  } = props;
  const { mutate } = useContribution();

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

  const handleLike = async (): Promise<void> => {
    await toast.promise(ContributionService.like(id), {
      loading: 'Attempting to like the contribution',
      success: `Successfully liked the contribution`,
      error: (e) => Utils.capitalize(e.response.data.message.toString()),
    });
    await mutate();
  };

  const handleDislike = async (): Promise<void> => {
    await toast.promise(ContributionService.dislike(id), {
      loading: 'Attempting to dislike the contribution',
      success: `Successfully disliked the contribution`,
      error: (e) => Utils.capitalize(e.response.data.message.toString()),
    });
    await mutate();
  };

  // NOTE: Prevent user from liking and disliking the contribution at the same time
  const isButtonDisabled = (): boolean => isLiked || isDisliked;

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
        className="card relative z-10 w-52 bg-base-100 shadow-xl"
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
              <span className="truncate">{createdBy}</span>
            </div>
          </div>
          <div className="divider m-0" />
          <div className="card-actions flex-nowrap justify-center">
            <button
              className="btn relative w-full shrink"
              onClick={handleLike}
              disabled={isButtonDisabled()}
            >
              <BsFillHandThumbsUpFill />
              <span className="absolute right-0 top-0 z-20 inline-flex h-6 w-6 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-success text-neutral">
                {likes.length}
              </span>
            </button>
            <button
              className="btn relative w-full shrink"
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
      </motion.div>
    );
  };

  return renderMarker();
};
