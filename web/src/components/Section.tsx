import { IContribution } from '../common';
import { useModal } from '../hooks';
import { Entry } from './Entry';

interface IProps {
  data: IContribution[];
  setDisplayContributionId: React.Dispatch<React.SetStateAction<string>>;
  refetchData: () => Promise<void>;
}

export const Section = ({
  data,
  setDisplayContributionId,
  refetchData,
}: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const { openModal } = useModal();

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  const renderCards = (): JSX.Element[] | JSX.Element => {
    if (!data || data.length === 0) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
          <span className="text-lg font-semibold uppercase italic text-info">
            &lt; There&rsquo;s currently no reportings /&gt;
          </span>
          <button className="btn btn-info btn-wide" onClick={openModal}>
            Contribute
          </button>
        </div>
      );
    }
    return data.map((data) => (
      <Entry
        {...data}
        onView={() => setDisplayContributionId(data.id)}
        refetchData={refetchData}
      />
    ));
  };

  return (
    <div className="mt-3 flex h-full w-full flex-col space-y-3 overflow-hidden overflow-y-scroll rounded-lg bg-base-200 p-5">
      {renderCards()}
    </div>
  );
};
