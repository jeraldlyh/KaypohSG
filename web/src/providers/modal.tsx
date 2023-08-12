'use client';
import { createContext, useContext } from 'react';
import toast from 'react-hot-toast';
import { BiSolidError } from 'react-icons/bi';
import {
  DEFAULT_PAYLOAD,
  IContribution,
  ICoordinates,
  MODAL_ID,
  Utils,
} from '../common';
import { useModal } from '../hooks';
import { ContributionService } from '../services';

interface IModalContext {
  payload: Partial<IContribution>;
  openModal: () => void;
  closeModal: () => void;
  resetPayload: () => void;
  handleOnChange: (key: 'type' | 'description', value: string) => void;
}

interface IModalProvider {
  children: React.ReactNode;
}

const ModalContext = createContext<IModalContext>({
  payload: DEFAULT_PAYLOAD,
  openModal: () => {},
  closeModal: () => {},
  resetPayload: () => {},
  handleOnChange: (key: 'type' | 'description', value: string) => {},
});

const useModalContext = () => useContext(ModalContext);

const ModalProvider = ({ children }: IModalProvider) => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const modal = useModal();

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const handleOnSubmit = async (): Promise<void> => {
    await toast.promise(
      ContributionService.create({
        type: modal.payload.type,
        location: modal.payload.location,
        description: modal.payload.description,
      }),
      {
        loading: 'Attempting to contribute',
        success: 'Successfully contributed',
        error: (e) => Utils.capitalize(e.response.data.message.toString()),
      },
    );
    modal.resetPayload();
    modal.closeModal();
  };

  const handleClose = (): void => {
    modal.resetPayload();
    modal.closeModal();
  };

  const isButtonDisabled = (): boolean =>
    !modal.payload.description ||
    !modal.payload.location?.lat ||
    !modal.payload.location?.lng;

  // NOTE: Prevent user from editing the field again after selection, otherwise have to deal with state
  const isLocationDisabled = (): boolean =>
    !!modal.payload.location?.lat && !!modal.payload.location?.lng;

  const handleOptionSelect = (option: ICoordinates): void => {
    modal.handleOnChange('location', { lat: option.lat, lng: option.lng });

    const locationInput = document.getElementById(
      'location',
    ) as HTMLInputElement;
    locationInput.value = option.address;
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  const renderOptions = (): JSX.Element | undefined => {
    if (!!modal.payload.location?.lat && !!modal.payload.location?.lat) return;

    if (modal.payload.options && modal.payload.options.length > 0) {
      return (
        <div className="absolute left-0 top-full z-10 w-full rounded-lg bg-base-200">
          {modal.payload.options.map((option, index) => (
            <button
              key={index}
              className="btn btn-ghost w-full"
              onClick={() => handleOptionSelect(option)}
            >
              <span className="w-full text-start">{option.address}</span>
            </button>
          ))}
        </div>
      );
    }

    return (
      <div
        className="tooltip tooltip-left absolute right-3 top-1/2 text-error"
        data-tip="Invalid address"
      >
        <BiSolidError />
      </div>
    );
  };

  return (
    <ModalContext.Provider value={modal}>
      <dialog id={MODAL_ID} className="modal bg-neutral/75">
        <div className="modal-box px-10 py-8">
          <p className="mb-3 text-center text-lg font-semibold md:text-xl">
            Contribute to the community
          </p>
          <div className="my-4 flex flex-col space-y-2">
            <span className="font-semibold">Type</span>
            <select
              onChange={(e) => modal.handleOnChange('type', e.target.value)}
              className="select select-bordered w-full"
            >
              <option>Info</option>
              <option>Alert</option>
              <option>Sighting</option>
            </select>
          </div>
          <div className="my-4 flex flex-col space-y-2">
            <span className="font-semibold">Description</span>
            <textarea
              className="textarea textarea-bordered px-3 text-sm placeholder:italic"
              placeholder="Enter your description"
              value={modal.payload.description}
              onChange={(e) =>
                modal.handleOnChange('description', e.target.value)
              }
            />
          </div>
          <div className="relative my-4 flex flex-col space-y-2">
            <div className="space-x-1">
              <span className="font-semibold">Location</span>
              <span className="text-sm italic">(choose from dropdown)*</span>
            </div>
            <input
              id="location"
              className="input input-bordered px-3 text-sm placeholder:italic"
              placeholder="Search for a location"
              onChange={(e) => modal.handleOnChange('query', e.target.value)}
              disabled={isLocationDisabled()}
            />
            {renderOptions()}
          </div>
          <div className="mt-3 flex w-full flex-col-reverse md:flex-row md:space-x-4">
            <button
              className="btn btn-secondary w-full flex-shrink"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary mb-2 w-full flex-shrink md:m-0"
              onClick={handleOnSubmit}
              disabled={isButtonDisabled()}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModalContext };
