import { clsx } from 'clsx';

interface IProps {
  children: React.ReactNode;
  styles?: string;
}

export const Container = ({ children, styles }: IProps) => {
  const classname = clsx({
    'flex w-screen min-h-screen md:px-24 px-12 py-10 flex-col items-center justify-center overflow-y-scroll':
      true,
    ...(styles && { [styles]: true }),
  });

  return <div className={classname}>{children}</div>;
};
