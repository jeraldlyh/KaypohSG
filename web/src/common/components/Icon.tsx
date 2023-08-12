import { AiFillExclamationCircle, AiFillEye } from 'react-icons/ai';
import { GoAlertFill } from 'react-icons/go';
import { TType } from '../types';

interface IProps {
  type: TType;
}

export const Icon = ({ type }: IProps) => {
  const renderIcon = (): JSX.Element => {
    switch (type) {
      case 'alert':
        return <GoAlertFill />;
      case 'info':
        return <AiFillExclamationCircle />;
      case 'sighting':
        return <AiFillEye />;
    }
  };

  return renderIcon();
};
