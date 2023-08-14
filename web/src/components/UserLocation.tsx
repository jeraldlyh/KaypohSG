interface IProps {
  lat: string;
  lng: string;
}

export const UserLocation = (props: IProps): JSX.Element => {
  return (
    <div className="h-10 w-10 rounded-full border-[3px] border-dashed border-error p-10" />
  );
};
