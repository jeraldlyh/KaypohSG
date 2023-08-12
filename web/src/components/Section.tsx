import { IContribution } from '../common';
import { Entry } from './Entry';

interface IProps {
  data: IContribution[];
}

export const Section = ({ data }: IProps): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  const renderCards = (): JSX.Element[] | JSX.Element => {
    if (!data || data.length === 0) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <span className="text-lg font-semibold uppercase italic text-info">
            &lt; There&rsquo;s currently no reportings /&gt;
          </span>
        </div>
      );
    }
    return data.map((data) => <Entry {...data} />);
  };

  return (
    <div className="mt-3 flex h-full w-full flex-col space-y-3 overflow-hidden overflow-y-scroll rounded-lg bg-base-200 p-5">
      {renderCards()}
    </div>
  );
};
